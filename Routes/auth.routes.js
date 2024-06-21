import  { Router } from "express";
import { registerUser,loginUser,findUser } from "../Controllers/auth.controller.js";
import { jwtMiddleware } from "../Middlewares/authJwt.middleware.js";

const router=Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/find-user').get(jwtMiddleware,findUser);

export default router;