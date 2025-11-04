import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
export default async function connectToDB(){
    try{
        const {MONGO_URL}=process.env;
        if(!MONGO_URL)throw new Error("MONGO_URL is not set");
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB is connected successfully!!!')
    }catch(err){
        console.error('Mongodb Error:', err);
        process.exit(1); //1->fail and 0->success
    }
}