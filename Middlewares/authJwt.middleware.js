import jwt from 'jsonwebtoken'
import { ApiError } from '../Utils/ApiError.js';
import cryptoJs from 'crypto-js';

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
    
    //DECRYPT PAYLOAD 
    const bytes = await cryptoJs.AES.decrypt(data.data, process.env.CRYPTO_SECRET);
    const decryptedData =await JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    req.userData=decryptedData;  
    
    next()
}

export {
    jwtMiddleware
}