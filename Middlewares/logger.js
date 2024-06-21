import fs from 'fs';
import path from 'path';
import express from 'express';

express.static(path.join(path.resolve(),'public'))

const logger=async (req,res,next)=>{
    // console.log('some request happened');
    // fs.readFile('./Public/logs.txt','utf-8',(err,data)=>{
    //     if(err){
    //         console.log(err);
    //         return
    //     }
    //     console.log('file data:',data)
    // })
    const currentDate=new Date();
    // console.log(currentDate.toISOString())
    // console.log(req.ip,req.method,req.url,req.hostname,)

    const writingData=`\n ${currentDate} , ${req.ip} , ${req.method} , ${req.url} , ${req.hostname}`

    fs.appendFileSync('./Public/logs.txt',writingData,(error)=>{
        if(error){
            console.log(error);
            return;
        }
        // console.log(' write action performed')
    })
    // const data=await fs.readFile('../Public/logs.txt');
    // console.log(data)
    next();
}

export default logger;