import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import authRouter from './routes/auth.routes.js';

dotenv.config();

const PORT=process.env.PORT||3000;

const __dirname=path.resolve();

const app=express();

app.use('/auth',authRouter);

if(process.env.NODE_ENV=== "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
}

app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
});

app.listen(PORT,()=>{
    console.log('Server is listening at 3000 ');
})