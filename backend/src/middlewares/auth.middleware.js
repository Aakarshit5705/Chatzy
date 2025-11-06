import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import "dotenv/config";



export const protectRoute =async(req,res,next)=>{
    try {
        const token =req.cookies.jwt;
        if(!token) return res.status(401).json({message:"User Not Authorized"});
        
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) return res.status(401).json({message:"Token not correct!!"});

        const user=await UserModel.findById(decoded.userId).select("-password");
        if(!user) return res.status(404).json({message:"User not found"});

        req.user=user;

        next();

    } catch (error) {
        console.log("Error in protectRoute: ",error);
        return res.status(500).json({message:"Internal Server Error"});
    }
}