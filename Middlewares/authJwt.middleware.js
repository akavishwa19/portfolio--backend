import jwt from 'jsonwebtoken'
import { ApiError } from '../Utils/ApiError.js';
import cryptoJs from 'crypto-js';
import fs from 'fs';

const jwtMiddleware=async (req,res,next)=>{

    //EXTRACT COOKIE
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json(
            new ApiError(401,'Unauthorised Access')
        )
    }

    //VERIFY JWT
    const data= await jwt.verify(token,process.env.JWT_SECRET);

    //READ PRIVATE KEY
    let privateKey=fs.readFileSync('./Public/key.txt','utf-8');
    
    //DECRYPT PAYLOAD 
    const bytes = await cryptoJs.AES.decrypt(data.data, privateKey);
    const decryptedData =await JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    req.userData=decryptedData;      
    next()
}

export {
    jwtMiddleware
}