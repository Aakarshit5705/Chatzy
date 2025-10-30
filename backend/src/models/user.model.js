import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{type:String,unqiue:true,required:true},
    password:{type:String,required:true},
    userName:{type:String,required:true},
    profilePic:{type:String,default:""}
},{timestamps:true});

const UserModel=mongoose.model('User',userSchema);
export default UserModel;