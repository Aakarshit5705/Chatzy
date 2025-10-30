
import bcrypt from 'bcrypt';

import UserModel from "../models/user.model.js";
import { generateToken } from '../lib/utils.js';



export const signup=async(req,res)=>{
    const{userName,email,password}=req.body;
    try{
        if(!userName||!email||!password){
           return res.status(400).json({message:"All fields are required!!"})
        }
        if(password<6){
            return res.status(400).json({message:"Password must be atleast 6 characters!! "})
        }
        //valid email or not
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format!! "})
       }
       const user=await UserModel.findOne({email});
       if(user){
        return res.status(400).json({message:"User Already Exists!! "})
       }
       const hashedPassword=await bcrypt.hash(password,12);
       const newUser= new UserModel({
        email,password:hashedPassword,userName
       });
       if(newUser){
        generateToken(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            email:newUser.email,
            userName:newUser.userName,
            profilePic:newUser.profilePic
        })
       }else{
        res.status(400).json({message:"Invalid user data"})
       }
    }catch(err){
        console.log("Error in signing up controller: ",err);
        res.status(500).json({message:"Internal server error: "})

    }
}