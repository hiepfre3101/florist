import express from "express";
import { create, getAll } from "../controllers/order.js";

const orderRouter = express.Router();

orderRouter.get("/orders", getAll);
orderRouter.post("/orders", create);
export default orderRouter;
