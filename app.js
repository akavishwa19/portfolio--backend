import express from "express";
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
import connectDB from "./connection.js";
import logger from "./Middlewares/logger.js";
import cookieParser from "cookie-parser";
import { cronTask } from "./Services/keyScheduler.js";

const app=express();

express.static(path.join(path.resolve(),'public'))

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(logger)

connectDB()
cronTask()

//TEST ROUTE
app.get('/', async (req,res)=>{
    res.send('app is running')
})

//IMPORTING ROUTES
import userRouter from './Routes/auth.routes.js';

//USING ROUTES
app.use('/api/v1/users',userRouter);

const port=process.env.PORT || 3000;

app.listen(port,()=>{
    console.log('app is running on http://localhost:'+port)
})