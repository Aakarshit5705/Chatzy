import React, { useEffect } from 'react';
import { useChat } from '../store/useChatStore';
import UsersLoadingSkeleton from './UsersLoadingSkeleton';
import NoChatsFound from './NoChatsFound';
import { useAuth } from '../store/useAuthStore';

function ChatsList() {
  const { getChatPartners, chats = [], isUserLoading, setSelectedUser } = useChat();
  const {onlineUsers}=useAuth();

  useEffect(() => {
    getChatPartners();
  }, [getChatPartners]);

  if (isUserLoading) return <UsersLoadingSkeleton />;
  if (!chats.length) return <NoChatsFound />;

  return (
    <div className="space-y-2">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar ${onlineUsers.includes(chat._id)?"online":"offline"}`}>
              <div className="size-12 rounded-full">
                <img src={chat.profilePic || '/avatar.png'} alt={chat.userName} />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {chat.userName}
            </h4>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatsList;
