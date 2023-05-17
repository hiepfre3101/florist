import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();
export const checkPermission = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    //check login
    if (!authHeader) {
      return res.json({
        message: "Ban phai dang nhap de thuc hien hanh dong nay.",
      });
    }
    const token = authHeader && authHeader.split(" ")[1];
    //decode jwt
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    //get user
    const user = await User.findOne({ _id: decodedToken.id });
    if (!user.role === "admin") {
      return res.json({
        message: "Ban phai la admin de thuc hien quyen nay!",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
