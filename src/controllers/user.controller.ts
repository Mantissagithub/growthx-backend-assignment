import {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Admin from "../models/admin.model";
import Assignment from '../models/assignment.model';
import User from '../models/user.model';

const jwt_secret = process.env.JwT_SECRET || "defaultSecret";

export const userRegister = async (req : Request, res : Response) => {
    const {fullName, email, password, confirmPassword} = req.bidy;

    if(password != confirmPassword){
        return res.status(400).json({message : 'Passwirds do not match'});
    }

    try{
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message : 'User already exists'});
        }

        const userId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            fullName,
            email,
            password : hashedPassword,
            userId,
            role : 'user',
        })

        await newUser.save();

        const token = jwt.sign({userId, email, role:'user'}, jwt_secret, {expiresIN : '1hr'});
        res.status(201).json({message : 'User resistered successfully'});
    }catch(err){
        console.error('[UserControler] Error during registration: ', err);
        res.status(500).jaon({message : 'Server error'});
    }
};

export const userLogin = async (req : Request, res : Response) => {
    const  {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : 'Email not found'});
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword){
            return res.status(400).json({message : "Incorrect password"});
        }
        const token =jwt.sign({userId : user.userId, email, role : user.role}, jwt_secret, {expiresIn : '1hr'});
        res.status(200).json({message : "User Logged in successfully"});
    } catch (error) {
        console.error("[UserController] Error during login: ", error);
        res.status(500).json({message : "Internal server"});
    }
};

export const uploadAssignment = async (req: Request, res : Response) => {
    const {task, adminEMail} = req.body;
    const userId = req.user.userId;
    const id = uuidv4();

    try {
        const user = await User.findOne({userId});
        if(!user){
            return res.status(400).json({message : "User not found."});
        }

        const admin = await Admin.findOne({adminEMail});
        if(!admin){
            return res.status(400).json({message : "Admin not found."});
        }

        const newAssignment = new Assignment({
            id,
            task,
            userId : user._id,
            adminId : admin._id
        });

        await newAssignment.save();

        user.assignments.push(newAssignment.id);
        admin.assignedAssignments.push(newAssignment.id);

        await Promise.all([user.save(), admin.save()]);

        res.status(200).json({message : "Assignment uploaded successfully"});
    } catch (error) {
        console.error("UserController] Error uploading assignment: ", error);
        res.status(500).json({message : "INternal server error"});
    }
};

export const getAdmins = async(req : Request, res : Response) => {
    try{
        const admins = await Admin.find({}, 'adminId name adminEmail');
        return res.status(200).json({admins});
    }catch(err){
        console.error("[UserController] Error fetching admins : ", err);
        res.status(500).json({message : "Internal server"});
    }
};

export const getCurrentUser = async (req : Request, res : Response) => {
    try{
        const user = await User.findOne({userId : req.user.userId}).select('-password');
        if(!user){
            return res.status(404).json({message : "User not found"});
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("[UserController] Eroor fetching current user: ", error);
        return res.status(500).json({message : "Internal server error"});
    }
};

export const updateUser = async (req : Request, res : Response) => {
    const {fullName, email} = req.body;

    try {
        const updatedUser = await User.findOneAndUpdate(
            {userId : req.user.userId},
            { fullName, email},
            {new : true}
        ).select('-password');

        if(!updatedUser){
            return res.status(404).json({message : 'User not found'});
        }

        return res.status(200).json(updateUser);
    } catch (error) {
        console.error("[UserController] Error updating user: ", error);
        res.status(500).json({message : "Internal server error"});
    }
};

export const deleteUser = async (req: Request, res : Response) => {
    try{
        const deletedUser = await User.findOneAndDelete({userId : req.user.userId});

        if(!deletedUser){
            return res.status(404).json({message : "User not found"});
        }

        res.status(200).json({message : "User deleted successfully"});
    }catch(err){
        console.error("[UserController] Erro deleting user : ", err);
        res.status(500).json({message : "Internal sevre error"});
    }
}