import jwt from "jsonwebtoken";
import { ApiError } from "../Utils/ApiError.js";
import cryptoJs from "crypto-js";
import fs from "fs";

const jwtMiddleware = async (req, res, next) => {
  try {
    //EXTRACT COOKIE
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json(new ApiError(401, "Unauthorised Access"));
    }

    //READ PRIVATE KEY
    let key = fs.readFileSync("./Public/publicKey.txt", "utf-8");

    //VERIFY JWT
    const data = await jwt.verify(token, key);
    if (!data) {
      return res.status(401).json(new ApiError(401, "Unauthorised Access"));
    }

    //DECRYPT PAYLOAD
    const bytes = await cryptoJs.AES.decrypt(data.data, process.env.JWT_SECRET);
    const decryptedData = await JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    req.userData = decryptedData;
    next();
  } catch (error) {
    return res.status(401).json(new ApiError(401, error.message));
  }
};

export { jwtMiddleware };
