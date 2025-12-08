import React, { useEffect } from 'react'
import { useChat } from '../store/useChatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton';

function ContactList() {
    const {getAllContacts,allContacts,isUserLoading,setSelectedUser}=useChat();
    useEffect(()=>{
      getAllContacts();
    },[getAllContacts]);
    if(isUserLoading) return <UsersLoadingSkeleton/>
  return (
    <div>
      {allContacts.map((contact) => (
        <div
          key={contact._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors mb-2"
          onClick={() => setSelectedUser(contact)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar online`}>
              <div className="size-12 rounded-full">
                <img src={contact.profilePic || "/avatar.png"} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium">{contact.userName}</h4>
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default ContactList
