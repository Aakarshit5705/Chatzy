import {Server} from "socket.io"
import http from "http";
import "dotenv/config";
import express from "express";
import { socketAuthMiddleware } from "../middlewares/socketAuth.middleware.js";


const app=express();

const server=http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:[process.env.CLIENT_URL],
        credentials:true
    }

});

io.use(socketAuthMiddleware);

export const getReceiverSocketId=(userId)=>{
    return socketUserMap[userId]
}

const socketUserMap={};

io.on("connection",(socket)=>{
    console.log("A User Connected: ",socket.user.userName);
    const userId=socket.userId;
    socketUserMap[userId]=socket.id;

    //used to send events to all connected users
    io.emit("getOnlineUsers",Object.keys(socketUserMap));

    socket.on("disconnect",()=>{
        console.log("A User Disconnected: ",socket.user.userName)
        delete socketUserMap[userId];
        io.emit("getOnlineUsers",Object.keys(socketUserMap));
    });

});

export {server,io,app};