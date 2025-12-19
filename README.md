# 💬 Chatzy — Real-Time Chat Web Application

Chatzy is a modern **full-stack real-time chat application** built to deliver fast, secure, and seamless communication. It supports real-time messaging using **Socket.IO**, secure authentication, sound-based interactions, and scalable global state management with **Zustand**.

---

## 🌐 Live Links

* **Live Website:** [Chatzyy](https://chatzy-25sae.sevalla.app/)


> ℹ️ Users access the application via the frontend link.
> ℹ️ This GitHub repository contains only the source code.

---

## 🚀 Features

### 🔐 Authentication & Security

* User signup and login
* JWT-based authentication
* Protected API routes and sockets
* Secure middleware handling

### 💬 Real-Time Chat

* One-to-one real-time messaging
* Socket.IO based communication
* Online user presence
* Persistent chat history

### 🔔 User Experience

* Typing and notification sounds
* Loading skeletons for smooth UI
* Clean and responsive interface
* Optimized performance with Vite

### 📧 Email & Media

* Email handling with templates
* Cloudinary integration for media
* Structured email services

---

## 🧠 Tech Stack

### 🎨 Frontend

* React (Vite)
* Zustand (State Management)
* Axios
* Tailwind CSS
* Socket.IO Client

### 🛠 Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Socket.IO
* JWT Authentication
* Cloudinary
* Resend (Email Service)
* Arcjet (Security & Protection)

---

## 📁 Project Structure

### 🔧 Backend

```
backend/
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   └── message.controller.js
│   ├── emails/
│   │   ├── emailHandler.js
│   │   └── emailTemplates.js
│   ├── lib/
│   │   ├── arcjet.js
│   │   ├── cloudinary.js
│   │   ├── db.config.js
│   │   ├── resend.js
│   │   ├── socket.js
│   │   └── utils.js
│   ├── middlewares/
│   │   ├── arcjet.middleware.js
│   │   ├── auth.middleware.js
│   │   └── socketAuth.middleware.js
│   ├── models/
│   │   ├── user.model.js
│   │   └── messages.model.js
│   └── routes/
│       ├── auth.routes.js
│       ├── message.routes.js
│       └── index.js
├── package.json
└── package-lock.json
```

---

### 🎨 Frontend

```
frontend/
├── public/
│   ├── sounds/
│   │   ├── keystroke1.mp3
│   │   ├── keystroke2.mp3
│   │   ├── keystroke3.mp3
│   │   ├── keystroke4.mp3
│   │   ├── mouse-click.mp3
│   │   └── notification.mp3
│   ├── avatar.png
│   ├── login.png
│   └── signup.png
├── src/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   ├── store/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the **backend** directory:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

RESEND_API_KEY=xxxx
```

---

## ▶️ Running Locally

### Backend

```
cd backend
npm install
npm start
```

### Frontend

```
cd frontend
npm install
npm run dev
```

---

## 🌍 Deployment

* Frontend and Backend deployed using **Sevalla**
* Environment variables managed via Sevalla dashboard
* Socket.IO configured for production

---

## 🔮 Future Improvements

* Group chats
* Read receipts
* Message reactions
* File & image sharing
* Dark / Light mode
* Voice messages

---

## 👨‍💻 Author

**Aakarshit Khajuria**
GitHub: [https://github.com/Aakarshit5705](https://github.com/Aakarshit5705)

---

## 📄 License

This project is licensed under the **MIT License**.
