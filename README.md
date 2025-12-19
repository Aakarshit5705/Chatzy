Chatzy 💬

Chatzy is a modern, full-stack real-time chat application built with a clean React + Node.js architecture, featuring real-time messaging via Socket.IO, authentication, email handling, sound effects, and state management using Zustand.

🚀 Features

🔐 JWT-based Authentication (Signup / Login)

💬 Real-time messaging using Socket.IO

👥 User & contact management

📨 Message persistence with MongoDB

🔔 Sound effects for typing, clicks & notifications

📧 Email support (templates + handlers)

🖼️ Cloudinary integration for media handling

🛡️ Middleware-based route & socket protection

⚡ Fast Vite-based frontend

🌍 Production deployment using Sevalla

🧠 Tech Stack
Frontend

React (Vite)

Zustand (global state management)

Axios

Tailwind CSS

Custom hooks

Socket.IO Client

Backend

Node.js

Express.js

MongoDB + Mongoose

Socket.IO

JWT Authentication

Cloudinary

Resend (email service)

Arcjet (security / protection)

📁 Project Structure
Backend (/backend)
backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── message.controller.js
│   │
│   ├── emails/
│   │   ├── emailHandler.js
│   │   └── emailTemplates.js
│   │
│   ├── lib/
│   │   ├── arcjet.js
│   │   ├── cloudinary.js
│   │   ├── db.config.js
│   │   ├── resend.js
│   │   ├── socket.js
│   │   └── utils.js
│   │
│   ├── middlewares/
│   │   ├── arcjet.middleware.js
│   │   ├── auth.middleware.js
│   │   └── socketAuth.middleware.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   └── messages.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── message.routes.js
│   │   └── index.js
│
├── package.json
└── package-lock.json

Frontend (/frontend)
frontend/
├── public/
│   ├── sounds/
│   │   ├── keystroke1.mp3
│   │   ├── keystroke2.mp3
│   │   ├── keystroke3.mp3
│   │   ├── keystroke4.mp3
│   │   ├── mouse-click.mp3
│   │   └── notification.mp3
│   │
│   ├── avatar.png
│   ├── login.png
│   └── signup.png
│
├── src/
│   ├── components/
│   │   ├── ChatContainer.jsx
│   │   ├── ChatHeader.jsx
│   │   ├── ChatsList.jsx
│   │   ├── ContactList.jsx
│   │   ├── MessageInput.jsx
│   │   ├── ProfileHeader.jsx
│   │   └── (UI & skeleton components)
│   │
│   ├── hooks/
│   │   └── useKeyBoardSound.js
│   │
│   ├── lib/
│   │   └── axios.js
│   │
│   ├── pages/
│   │   ├── ChatPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── SignupPage.jsx
│   │
│   ├── store/
│   │   ├── useAuthStore.js
│   │   └── useChatStore.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── tailwind.config.js
├── vite.config.js
├── package.json
└── package-lock.json

🧩 State Management

Chatzy uses Zustand instead of React Context for:

Authentication state

User session handling

Chat & message state

Socket-related updates

This keeps the app lightweight, scalable, and easy to maintain.

⚙️ Environment Variables

Create a .env file inside the backend directory:

PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

RESEND_API_KEY=xxxx

▶️ Running Locally
Backend
cd backend
npm install
npm start

Frontend
cd frontend
npm install
npm run dev

🌍 Deployment

Frontend & Backend deployed using Sevalla

Socket.IO configured for production environment

Environment variables managed via Sevalla dashboard

🔮 Future Enhancements

Group chats

Message reactions

Read receipts

File & image sharing

Voice messages

Dark / Light theme toggle

👨‍💻 Author

Aakarshit Khajuria
GitHub: Aakarshit5705
