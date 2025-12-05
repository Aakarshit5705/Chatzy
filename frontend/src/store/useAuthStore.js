import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuth=create((set,get)=>({
    authUser:null,
    isChecking:true,
    isSigningUp:false,
    isLoggingIn:false,
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
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in checkAuth: ",error);
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
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in checkAuth: ",error);
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
        } catch (error) {
            toast.error(error.response.data.message)
            console.log("Error in checkAuth: ",error);
        }
    }
}))