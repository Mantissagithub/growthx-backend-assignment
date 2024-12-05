import mongoose, {Document, Schema} from "mongoose";

interface Admin_interface extends Document{
    adminId : string;
    role? : 'admin';
    name : string;
    adminEmail : string;
    adminPassword? : string;
    assignedAssignments : mongoose.Types.ObjectId[];
    acceptedAssignments : mongoose.Types.ObjectId[];
    rejectedAssignments : mongoose.Types.ObjectId[];
};

const adminSchema = new mongoose.Schema({
    adminId: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['admin'] },
    name: { type: String, required: true },
    adminEmail: { type: String, required: true, unique: true, lowercase: true, trim: true },
    adminPassword: { type: String, required: true },
    assignedAssignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    acceptedAssignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    rejectedAssignments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Assignment' }],
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now }
}, {timestamps : true});

// adminSchema.pre('save', function(next){
//     this.updatedAt = Date.now();
//     next();
// });

const Admin = mongoose.model<Admin_interface>('Admin', adminSchema);

export default Admin;