import {create} from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { useAuth } from "./useAuthStore.js";


export const useChat=create((set,get)=>({
    allContacts:[],
    chats:[],
    messages:[],
    activeTab:"chats",
    selectedUser:null,
    isUserLoading:false,
    isMessageLoading:false,
    isSoundEnabled:JSON.parse(localStorage.getItem("isSoundEnabled"))===true,

    toggleSound:()=>{
        localStorage.setItem("isSoundEnabled",!get().isSoundEnabled)
        set({isSoundEnabled:!get().isSoundEnabled})
    }, 
    setActiveTab:(tab)=>set({activeTab:tab}),
    setSelectedUser:(user)=>set({selectedUser:user}),

    getAllContacts:async()=>{
        set({isUserLoading:true})
        try {
            const res=await axiosInstance.get('/message/contacts');
            set({allContacts:res.data});

        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
           set({isUserLoading:false}) 
        }
    },

    getChatPartners:async()=>{
        set({isUserLoading:true})
        try {
            const res=await axiosInstance.get(`/message/chats`);
            set({chats:res.data});

        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
           set({isUserLoading:false}) 
        }
    },
    getMessagesByUserId:async(userId)=>{
        set({isMessageLoading:true})
        try {
            const res=await axiosInstance.get(`/message/${userId}`);
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response?.data?.message||"Something went wrong!!");
        }finally{
           set({isMessageLoading:false}) 
        }
    },
    sendMessage:async(messageData)=>{
        const{selectedUser,messages}=get();
        const{authUser}=useAuth.getState();

        const tempId=`temp-${Date.now()}`;
        const optimisticMsg={
            _id:tempId,
            senderId:authUser._id,
            receiverId:selectedUser._id,
            text:messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        };
        set({ messages: [...messages, optimisticMsg] });

        try {
            const res=await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData);
            set({messages:messages.concat(res.data)})
            

        } catch (error) {
            set({ messages: messages });
            toast.error(error.response?.data?.message||"Something went wrong!!");
        }
    }

}))

