import express from 'express';
import dotenv from 'dotenv';
import path from 'path';

import authRouter from './routes/auth.routes.js';
import connectToDB from './lib/db.cofig.js';

const app=express();

dotenv.config();
app.use(express.json()); //req.body

const PORT=process.env.PORT||3000;

const __dirname=path.resolve();



app.use('/auth',authRouter);

if(process.env.NODE_ENV=== "production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));
}

app.get(/.*/,(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/dist/index.html"))
});

app.listen(PORT,()=>{
    console.log('Server is listening at 3000 ');
    connectToDB();
})