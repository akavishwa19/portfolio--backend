import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { saltRounds } from "../constants.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { ApiError } from "../Utils/ApiError.js";
import { generateKeyPair } from "../Services/keyGeneration.js";
import cryptoJs from 'crypto-js';
import forge from 'node-forge';
import fs from 'fs';
import path from 'path';
import express from 'express';

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

    

    //GENERATE PRIVATE KEY
    await generateKeyPair();
    // console.log(privateKey);
    // privateKey=privateKey.replace('-----BEGIN RSA PRIVATE KEY-----\n','')
    // console.log(privateKey);
    //ENCRYPT PAYLOAD

    let privateKey=fs.readFileSync('./Public/key.txt','utf-8');
    console.log(privateKey)

    const encryptedData= await cryptoJs.AES.encrypt(
        JSON.stringify(payload),
        privateKey
    ).toString()

    //SIGN JWT
    const token = await jwt.sign({data:encryptedData}, process.env.JWT_SECRET, {
      expiresIn: "10h",
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
    console.log(error)
    return res.status(500).json(new ApiError(500, error.message));
  }
};

const findUser = async (req, res) => {
  try {
    const userId=req.userData.userId;
    const user=await User.findById(userId)

    return res
      .status(200)
      .json(
        new ApiResponse(200, user, "lkess go")
      );
  } catch (error) {
    console.log(error)
    return res.status(500).json(new ApiError(500, error.message));
  }
};

export { registerUser, loginUser, findUser };
