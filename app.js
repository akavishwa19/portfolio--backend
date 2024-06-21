import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./connection.js";
import logger from "./Middlewares/logger.js";

const app=express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use(logger)

connectDB()

app.get('/', async (req,res)=>{
    res.send('app is running')
})

import userRouter from './Routes/auth.routes.js'
import cookieParser from "cookie-parser";


app.use('/api/v1/users',userRouter);

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('app is running on http://localhost:'+port)
})