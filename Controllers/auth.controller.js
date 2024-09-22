import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { saltRounds } from "../constants.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiError.js";
import cryptoJs from "crypto-js";
import fs from "fs";
import nodemailer from "nodemailer";

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json(new ApiError(400, "user already registered"));
    }
    let hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save(req.body);
    return res
      .status(200)
      .json(new ApiResponse(200, newUser, "user registered succesfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

const loginUser = async (req, res) => {
  try {
    //EXTRACT UNIQUE VALUE FROM DOCUMENT
    const { email } = req.body;

    //SEARCH FOR EXISTING USER
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res
        .status(400)
        .json(new ApiError(400, "Please register before you log in"));
    }

    //COMPARE PASSWORD
    const comparePassword = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!comparePassword) {
      return res.status(400).json(new ApiError(400, "Invalid credentials"));
    }

    //DEFINE JWT PAYLOAD
    const payload = {
      userId: existingUser._id,
      email: existingUser.email,
    };

    //READ PRIVATE KEY
    let privateKey = fs.readFileSync("./Public/privateKey.txt", "utf-8");

    //ENCRYPT PAYLOAD
    const encryptedData = await cryptoJs.AES.encrypt(
      JSON.stringify(payload),
      process.env.JWT_SECRET
    ).toString();

    //SIGN JWT
    const token = await jwt.sign({ data: encryptedData }, privateKey, {
      expiresIn: "10s",
      algorithm: "RS256",
    });

    //SET COOKIE
    res.cookie("token", token, {
      maxAge: 3600000,
      httpOnly: true,
      secure: true,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, token, "user registered succesfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

const findUser = async (req, res) => {
  try {
    const userId = req.userData.userId;
    const user = await User.findById(userId);

    return res.status(200).json(new ApiResponse(200, user, "less go"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

//OTP LOGIN
const sendMail = async (req, res) => {
  try {
    const { email, name, message } = req.body;

    // const otp=Math.floor(1000+Math.random()*9000);
    // const payload={
    //   email,otp
    // }
    // const loginToken=await jwt.sign(payload,process.env.OTP_SECRET,{expiresIn:'10m'});

    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "akashvishwakarma.codeship@gmail.com",
        pass: "nththyunttisubqk",
      },
    });
    let mailDetails = {
      from: email,
      to: "akash19102001@gmail.com",
      subject: "Someone tried to reach you from your portfolio",
      html: `
    <p>Hi,</p>
    <p>You received a message from <strong>${name}</strong> (${email}):</p>
    <p><em>${message}</em></p>
  
  `,
    };

    mailTransporter.sendMail(mailDetails, (err, data) => {
      if (err) {
        console.log(err);
      }
    });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "mail sent succesfully"));
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

const otpLogin = async (req, res) => {
  try {
    const { otp } = req.body;
    const payload = req.tokenPayloadOtp;
    const sentOtp = payload.otp;
    if (otp === sentOtp) {
      //LOGIC FOR SETTING
      return res
        .status(200)
        .json(new ApiResponse(200, {}, "user logged in succesfully"));
    } else {
      return res.status(400).json(new ApiError(400, "incorrect otp"));
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export { registerUser, loginUser, findUser, sendMail, otpLogin };
