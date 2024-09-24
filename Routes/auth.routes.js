import  { Router } from "express";
import { registerUser,loginUser,findUser, sendMail,sendMessage, otpLogin } from "../Controllers/auth.controller.js";
import { jwtMiddleware } from "../Middlewares/authJwt.middleware.js";
import { verifyOtp } from "../Middlewares/verifyOtp.js";

const router=Router();

// router.route('/register').post(registerUser);
// router.route('/login').post(loginUser);
// router.route('/find-user').get(jwtMiddleware,findUser);
router.route('/send-mail').post(sendMail);
router.route('/send-message').post(sendMessage);
// router.route('/otp-login').post(verifyOtp,otpLogin)

export default router;