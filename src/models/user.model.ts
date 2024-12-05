import mongoose, {Document, Schema} from "mongoose";

interface User_interface extends Document{
    userId : string;
    role : 'user' | 'admin';
    fullName : string;
    email : string;
    password : string;
    assignments : mongoose.Types.ObjectId[];
}

const userSchema = new Schema<User_interface>({
    userId : {type : String, required : true, unique : true},
    role : {type : String, required : true, enum : ['user', 'admin']},
    fullName : {type : String, required : true},
    email : {type : String, required : true, unique : true, lowercase : true, trim : true},
    password : {type : String, required : true, minLength : 6},
    assignments : [{type : mongoose.Schema.Types.ObjectId, ref : 'Assignment'}]
}, {timestamps : true});

const User = mongoose.model<User_interface>('User', userSchema);

export default User;
