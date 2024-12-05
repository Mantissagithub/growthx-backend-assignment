import mongoose, {Document, Schema} from "mongoose";

interface Assignment_interface extends Document{
    id : string;
    title : string;
    description : string;
    userId : mongoose.Types.ObjectId;
    adminId : mongoose.Types.ObjectId;
    status : 'pending' | 'accepted' | 'rejected' | 'completed';
};

const assignmentSchema = new Schema<Assignment_interface>({
    id : {type : String, required : true, unique : true},
    title : {type : String, required : true},
    description : {type : String, required : true, minLength : 10, maxLength : 500},
    userId : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    adminId : {type : mongoose.Schema.Types.ObjectId, ref : 'Admin'},
    status : {type : String, required : true, enum : ['pending', 'accepted', 'rejected']}
}, {timestamps : true});

const Assignment = mongoose.model<Assignment_interface>('Assignment', assignmentSchema);

export default Assignment;