import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const generateToken=(userId,res)=>{
    const {JWT_SECRET,NODE_ENV}=process.env;
        if(!JWT_SECRET)throw new Error("JWT_SECRET is not set");
        if(!NODE_ENV)throw new Error("NODE_ENV is not set");
    const token=jwt.sign({userId},JWT_SECRET,{
        expiresIn:"7d"
    });
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:NODE_ENV==='development'?false:true

    });
    return token;
}