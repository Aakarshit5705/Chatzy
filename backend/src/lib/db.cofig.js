import mongoose from 'mongoose';


export default async function connectToDB(){
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB is connected successfully!!!')
    }catch(err){
        console.error('Mongodb Error:', err);
        process.exit(1); //1->fail and 0->success
    }
}