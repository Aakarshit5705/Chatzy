import React, { useEffect, useRef } from 'react';
import { useChat } from '../store/useChatStore';
import { useAuth } from '../store/useAuthStore';
import ChatHeader from './ChatHeader.jsx';
import NoChatHistoryPlaceholder from './NoChatHistoryPlaceHolder.jsx';
import MessageInput from './MessageInput.jsx';
import MessagesLoadingSkeleton from './MessageLoadingSkeleton.jsx';

function ChatContainer() {
  const {
    messages,
    getMessagesByUserId,
    selectedUser,
    isMessageLoading,
  } = useChat();
  const { authUser } = useAuth();
  const messageEndRef=useRef();
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);


  if (!selectedUser) {
    return (
      <div className="flex flex-col h-full">
        <ChatHeader />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-slate-400">
            Select a conversation to start chatting.
          </p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!selectedUser?._id) return;
    getMessagesByUserId(selectedUser._id);
  }, [getMessagesByUserId, selectedUser?._id]);

  return (
    <div className="flex flex-col h-full">
      <ChatHeader />

      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessageLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser._id ? 'chat-end' : 'chat-start'
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser._id
                      ? 'bg-cyan-600 text-white'
                      : 'bg-slate-800 text-slate-200'
                  }`}
                >
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}

                  {msg.text && <p className="mt-2">{msg.text}</p>}

                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messageEndRef}/>
          </div>
        ) : isMessageLoading ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={selectedUser?.userName} />
        )}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
