
import bcrypt from 'bcrypt';
import "dotenv/config";

import UserModel from "../models/user.model.js";
import { generateToken } from '../lib/utils.js';
import { sendWelcomeEmail } from '../emails/emailHandler.js';
import cloudinary from '../lib/cloudinary.js';



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
        const savedUser=await newUser.save();
        generateToken(savedUser._id,res);
        
        res.status(201).json({
            _id:newUser._id,
            email:newUser.email,
            userName:newUser.userName,
            profilePic:newUser.profilePic
        })
        try {
            await sendWelcomeEmail(savedUser.email,savedUser.userName,process.env.CLIENT_URL)
            
        } catch (error) {
            console.log("Failed to send welcome email!!",error)
        }
       }else{
        res.status(400).json({message:"Invalid user data"})
       }
    }catch(err){
        console.log("Error in signing up controller: ",err);
        res.status(500).json({message:"Internal server error: "});

    }
}

export const login=async (req,res) => {
    const{email,password}=req.body;
    try {
        const user=await UserModel.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid Credentials"});
        const isCorrectPassword=await bcrypt.compare(password,user.password);
        if(!isCorrectPassword) return res.status(400).json({message:"Invalid Credentials"});

        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            email:user.email,
            userName:user.userName,
            profilePic:user.profilePic
        })
        
    } catch (error) {
        console.error("Error in login controller: ",error);
        res.status(500).json({message:"Internal Server Error"});
        
    }
}

export const logout=(req,res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged Out Successfully!!"});
}

export const updateProfile=async(req,res)=>{
    try {
        const {profilePic}=req.body;
        if(!profilePic) return res.status(404).json({message:"Profile Picture is required"});

        const userId=req.user._id;

        const uplaoded=await cloudinary.uploader.upload(profilePic);
        const updatedUser=await UserModel.findByIdAndUpdate(userId,{profilePic:uplaoded.secure_url},{new:true});
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in updateProfile ",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}