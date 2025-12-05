import React from 'react'
import { useAuth } from '../store/useAuthStore'

function ChatPage() {
  const {logout}=useAuth();
  return (
    <div className='z-10'>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default ChatPage
