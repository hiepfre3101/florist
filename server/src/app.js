import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";

import orderRouter from "./routes/order.js";
import productRouter from "./routes/product.js";
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/category.js";
import uploadRouter from "./routes/upload.js";
import userRouter from "./routes/user.js";
import typesRouter from "./routes/type.js";

dotenv.config();
mongoose.connect(process.env.DB_URL);
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
  cors:"*"
});
io.on("connection", (socket) => {
  socket.on("newOrder", (dataFromCLi) => {
    io.emit("newOrder", {
      data: `User ${
        dataFromCLi.data ? dataFromCLi.data : "nothing"
      } ordered successfully!`,
    });
  });
});
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", uploadRouter);
app.use("/api", userRouter);
app.use("/api", typesRouter);
app.use("/api", orderRouter);
httpServer.listen(process.env.PORT, () => {
  console.log("Server running");
});
