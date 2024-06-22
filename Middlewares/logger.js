import fs from 'fs';

const logger=async (req,res,next)=>{

    //MOMENT OF REQUEST
    const currentDate=new Date();
    const writingData=`\n ${currentDate} , ${req.ip} , ${req.method} , ${req.url} , ${req.hostname}`

    //APPEND TO FILE
    fs.appendFileSync('./Public/logs.txt',writingData,(error)=>{
        if(error){
            console.log(error);
            return;
        }
    })
    next();
}

export default logger;