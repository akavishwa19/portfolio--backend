import mongoose from "mongoose";
import db from './Models/index.js';
import 'dotenv/config';

const connectDB = async()=>{
    try{
        const instanceResult=await db.mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`);
        console.log('connected to mongo instance succesfully')
    }
    catch(error){
        console.log('cannot connect to mongo instance');
        process.exit(0)
    }
}


export default connectDB