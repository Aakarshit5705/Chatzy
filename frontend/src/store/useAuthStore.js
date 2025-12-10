import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";


const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuth=create((set,get)=>({
    authUser:null,
    isChecking:true,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingPhoto:false,
    socket:null,
    onlineUsers:[],
    checkAuth:async () =>{
        try {
            const res=await axiosInstance.get("/auth/check")
            set({authUser:res.data})
        } catch (error) {
            console.log("Error in checkAuth: ",error);
            set({authUser:null})
        }finally{
            set({isChecking:false})
        }
    },
    signUp:async(data)=>{
        set({isSigningUp:true})
        try {
            const res=await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("Account Created Successfully!!!")
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in signup: ",error);
            set({authUser:null})
        }finally{
            set({isSigningUp:false})
        }
    },
    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res=await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("LoggedIn Successfully!!!")
            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in login: ",error);
            set({authUser:null})
        }finally{
            set({isLoggingIn:false})
        }
    },
    logout:async()=>{
        try {
            await axiosInstance.post('/auth/logout');
            set({authUser:null});
            toast.success("Logged Out Successfully!!!")
            get().disconnectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in logout: ",error);
        }
    },
    updateProfile:async(data)=>{
        set({isUpdatingPhoto:true})
        try {
            const res=await axiosInstance.put('/auth/update-profile',data);
            set({authUser:res.data});
            toast.success("Profile Uploaded Successfully!!!");
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in updateProfile: ",error);
            
        }
        finally{
            set({isUpdatingPhoto:false})
        }
    },
    connectSocket:()=>{
        const {authUser}=get();
        if(!authUser||get().socket?.connected) return;

        const socket=io(BASE_URL,{withCredentials:true});

        socket.connect();

        set({socket});

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers:userIds})
        })
    },

    disconnectSocket:()=>{
        if(get().socket?.connected)get().socket.disconnect();
    }
}))