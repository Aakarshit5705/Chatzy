import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { getAllContacts, getChatPartners, getUserById, sendMessage } from '../controllers/message.controller.js';
import { arcjetProtection } from '../middlewares/arcjet.middleware.js';

const messageRouter =express.Router();
messageRouter.use(arcjetProtection,protectRoute);

messageRouter.get('/contacts',getAllContacts);
messageRouter.get('/chats',getChatPartners);
messageRouter.get('/:id',getUserById);

messageRouter.post('/send/:id',sendMessage)

export default messageRouter;