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
  const res = await axiosInstance.post(
    `/message/send/${selectedUser._id}`,
    messageData
  );

  // Replace optimistic message
  set((state) => ({
    messages: state.messages.map((msg) =>
      msg._id === tempId ? res.data : msg
    ),
  }));
} catch (error) {
  // Remove optimistic message if send fails
  set((state) => ({
    messages: state.messages.filter((msg) => msg._id !== tempId),
  }));

  toast.error(error.response?.data?.message || "Something went wrong!!");
}
    },
subscribeToMessages: () => {
  const { selectedUser, isSoundEnabled } = get();
  if (!selectedUser) return;

  const socket = useAuth.getState().socket;

  // 🔴 socket is null here sometimes → add a guard
  if (!socket) {
    console.log("No socket instance available yet, skipping subscribeToMessages");
    return;
  }

  // optional but recommended: prevent duplicate listeners
  socket.off("newMessage");

  socket.on("newMessage", (newMessage) => {
    const isMessageSentFromSelectedUser = newMessage.senderId?.toString() === selectedUser._id;
    if (!isMessageSentFromSelectedUser) return;

    // use functional set to avoid stale state
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));

    if (isSoundEnabled) {
      const notificationSound = new Audio("/sounds/notification.mp3");
      notificationSound.currentTime = 0;
      notificationSound.play().catch((e) =>
        console.log("Audio play failed:", e)
      );
    }
  });
},

unsubscribeFromMessages: () => {
  const socket = useAuth.getState().socket;

  if (!socket) {
    console.log("No socket instance available yet, skipping unsubscribeFromMessages");
    return;
  }

  socket.off("newMessage");
},

}))

