

import cloudinary from '../lib/cloudinary.js';
import MessageModel from "../models/messages.model.js"
import UserModel from '../models/user.model.js';


export const getAllContacts=async(req,res)=>{
    try {
        const loggedInId=req.user._id;
        const filteredUsers= await MessageModel.find({_id:{$ne:loggedInId}}).select("-password")

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.log("Error in getAllContacts: ",error);
        res.status(500).json({message:"Server Error"});
        
    }
}

export const getUserById=async(req,res)=>{
    try {
        const myId=req.user._id;
        const id=req.params;

        const messages =await MessageModel.find({
            $or:[
                {senderId:myId,receiverId:id},
                {senderId:id,receiverId:myId}
            ]
        })
        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getUserById: ",error);
        res.status(500).json({message:"Server Error"});
    }
}

export const sendMessage=async(req,res)=>{
    try {
        const{text,image}=req.body;
        const {id}=req.params;
        const senderId=req.user._id;
        if (!text && !image) {
            return res.status(400).json({ message: "Text or image is required." });
        }
        if (senderId.equals(receiverId)) {
            return res.status(400).json({ message: "Cannot send messages to yourself." });
        }
        const receiverExists = await UserModel.exists({ _id: receiverId });
        if (!receiverExists) {
            return res.status(404).json({ message: "Receiver not found." });
        }

        let imageUrl;
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }
        const newMessage = new MessageModel({
            senderId,
            receiverId:id,
            text,
            image: imageUrl,
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage: ",error);
        res.status(500).json({message:"Server Error"});
    }
}

export const getChatPartners=async(req,res)=>{
    try {
        const loggedInId=req.user._id;
        const messages =await MessageModel.find({
            $or:[
                {senderId:loggedInId},
                {receiverId:loggedInId}
            ]
        });
        const chatPartnersId= [...new Set(messages.map((msg)=>
        msg.senderId.toString()===loggedInId.toString()?msg.receiverId.toString():msg.senderId.toString())
        )];
        const chatPartners=await UserModel.find({_id:{$in:chatPartnersId}}).select("-password");
        res.status(200).json(chatPartners);

    } catch (error) {
        console.log("Error in getChatPartners: ",error);
        res.status(500).json({message:"Server Error"});      
    }
}