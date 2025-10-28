import express from 'express';

const authRouter=express.Router();

authRouter.get('/',(req,res)=>{
    res.send('Auth Services')
});

export default authRouter;