import  { Router } from "express";
import { registerUser,loginUser,findUser, sendOtp, otpLogin } from "../Controllers/auth.controller.js";
import { jwtMiddleware } from "../Middlewares/authJwt.middleware.js";
import { verifyOtp } from "../Middlewares/verifyOtp.js";

const router=Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/find-user').get(jwtMiddleware,findUser);
router.route('/send-otp').post(sendOtp);
router.route('/otp-login').post(verifyOtp,otpLogin)

export default router;