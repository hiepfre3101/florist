import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { signupSchema, signinSchema } from "../schemas/auth";
import bcrypt from "bcryptjs";
import { setCookie } from "../tools/createCookie";

dotenv.config();

export const createAccount = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(200).json({
        message: errors,
        status: "not success",
      });
    }
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist)
      return res.status(200).json({
        message: "Email da ton tai!!",
        status: "not success",
      });

    const hashedPwd = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      ...req.body,
      password: hashedPwd,
      role: "member",
      avatarDefault:
        "https://res.cloudinary.com/diqyzhuc2/image/upload/v1682956709/hoaUi/icon_sacea8.png",
    });
    if (!user) {
      return res.json({
        message: "Tao tai khoan không thành công",
        status: "not success",
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    user.password = undefined;
    const { cookieName, cookieValue, expire } = setCookie("jwt", token, 1);
    res.cookie(cookieName, cookieValue, { expire, httpOnly: true });
    return res.json({
      message: "Tao tai khoan thành công",
      accessToken: token,
      user,
      status: "success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      status: "not success",
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = signinSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(200).json({
        message: errors,
        status: "not success",
      });
    }
    const userExist = await User.findOne({ email: email }).populate({
      path: "images",
    });
    if (!userExist) {
      return res.status(200).json({
        message: "Tai khoan khong ton tai !",
        status: "not success",
      });
    }
    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(200).json({
        message: "Mat khau khong dung !",
        status: "not success",
      });
    }
    const token = jwt.sign({ id: userExist._id }, process.env.SECRET_KEY);
    userExist.password = undefined;
    const { cookieName, cookieValue, expire } = setCookie("jwt", token, 0.1);
    res.cookie(cookieName, cookieValue, { expire, httpOnly: true });
    return res.status(200).json({
      data: userExist,
      accessToken: token,
      status: "success",
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
      status: "not success",
    });
  }
};
