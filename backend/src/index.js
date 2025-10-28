import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes';

dotenv.config();

const PORT=process.env.PORT||3000;

const app=express();

app.use('/auth',authRouter);

app.listen(PORT,()=>{
    console.log('Server is listening at 3000 ');
})