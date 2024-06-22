import jwt from 'jsonwebtoken';
import { ApiError } from '../Utils/ApiError.js';

const verifyOtp = async (req,res,next)=>{

    const otpToken=req.headers['token'];
    if(!otpToken){
        return new ApiError(400,'Invalid Otp')
    }
    const data= await jwt.verify(otpToken,process.env.OTP_SECRET);
    req.tokenPayloadOtp=data;
    next();
}

export {
    verifyOtp
}