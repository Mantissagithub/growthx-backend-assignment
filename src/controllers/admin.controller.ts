import {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from "../models/admin.model";
import Assignment from '../models/assignment.model';

const jwt_secret = process.env.JwT_SECRET || "defaultSecret";

type AssignmentStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export const registerAdmin = async (req : Request, res : Response) => {
    const {name, email, password, confirmPassword} = req.body;

    if(password != confirmPassword){
        return res.status(400).json({message : 'Passwrods do not match'});
    }

    try{
        const existingAdmin = await Admin.findOne({adminEmail : email});
        if(existingAdmin){
            return res.status(400).json({message : 'Admin already exists'});
        }

        const adminId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Admin({
            adminId,
            name,
            adminEmail : email,
            adminPassword : hashedPassword,
            role : 'admin',
        });

        await newAdmin.save();

        const token = jwt.sign({adminId, email, role : 'admin'}, jwt_secret, {expiresIn : '1hr'});
        res.status(201).json({message : 'Admin registered successfully', token});
    }catch(err){
        console.error('[AdminController] Error during registration: ', err);
        res.status(500).json({message : 'Server error'});
    }
};

export const adminLogin = async(req : Request, res : Response) => {
    const {email, password} = req.body;

    try {
        const admin = await Admin.findOne({adminEmail : email});
        if(!admin){
            return res.status(400).json({message : 'EMail not found'});
        }

        const validPassword = await bcrypt.compare(password, admin.adminPassword);
        if(!validPassword){
            return res.status(401).json({message : 'Incorrect password'});
        }

        const token = jwt.sign({adminId : admin.adminId, email, role : 'admin'}, jwt_secret, {expiresIn : '1hr'});
        res.status(200).json({message : 'Admin Logged in successfully'});
    } catch (error) {
        console.error('[AdminController] Errror during login: ', error);
        res.status(500).json({message : 'Server error'});
    }
};

export const getAdmins = async (_req : Request, res : Response) => {
    try {
        const admins = await Admin.find().select('adminId name adminEmail createdAt');
        res.status(200).json({admins});
    } catch (error) {
        console.error('[AdminCOntroller] Error fetching admins: ', error);
        res.status(500).json({message : 'Server error'});
    }
};

export const updateAdminProfile = async (req : Request, res : Response) => {
    const {name, email, password, newPassword} = req.body;

    try {
        const admin = await Admin.findOne({adminId : req.user.adminId});
        
        if(password && newPassword){
            const validPassword = await bcrypt.compare(password, admin?.adminPassword);
            if(!validPassword){
                return res.status(400).status({message : 'Current password is incorrect'});
            }

            admin!.adminPassword = await bcrypt.hash(newPassword, 10);
        }

        if(admin){
            admin.name = name || admin.name;
            admin.adminEmail = email || admin.adminEmail;
            await admin.save();
        }

        res.status(200).json({message : "Profile updated successfully"});
    } catch (error) {
        console.error('[AdminController] Error updating profile: ', error);
        res.status(500).json({message : 'Server error'});
    }
};

export const getAssignnments = async (_req : Request, res : Response) => {
    try {
        const assignments = await Assignment.find().populate('userId adminId', 'fullName name');
        res.status(200).json({assignments});
    } catch (error) {
        console.error('[AdminController] Error fetching assignments: ', error);
        res.status(500).json({message : 'Server error'});
    }
};

export const updateAssignmentStatus = async (req : Request, res : Response, status : AssignmentStatus) => {
    try {
        const id = req.params;
        const assignment = await Assignment.findOne({id});

        if(!assignment){
            return res.status(404).json({message : 'Assignment not found'});
        }

        assignment.status = status;
        await assignment.save();

        res.status(200).json({message : `Assignment marked as ${status}`})
    } catch (error) {
        console.error('[AdminController] Error updating the assignment status: ', error);
        res.status(500).json({message : 'Server error'});
    }
};

export const acceptAssignment = (req: Request, res: Response) => {
    updateAssignmentStatus(req, res, 'accepted');
};

export const rejectAssignment = (req: Request, res: Response) => {
    updateAssignmentStatus(req, res, 'rejected');
};

export const completeAssignment = (req: Request, res: Response) => {
    updateAssignmentStatus(req, res, 'completed');
};

export const markAssignmentPending = (req: Request, res: Response) => {
    updateAssignmentStatus(req, res, 'pending');
};