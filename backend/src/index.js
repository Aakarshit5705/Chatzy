import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from './routes/auth.routes.js';
import messageRouter from './routes/message.routes.js';

import connectToDB from './lib/db.cofig.js';
import { app,server } from './lib/socket.js';

dotenv.config(); // ✅ Load env FIRST


const PORT = process.env.PORT || 3000;

const __dirname = path.resolve();

// Middlewares
app.use(express.json({ limit: "15mb" }));
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);

// Serve frontend in production only
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/dist/index.html")
    );
  });
}

// Start server
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  connectToDB();
});
