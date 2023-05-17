import { Router } from "express";
import { getAll, getOne } from "../controllers/user.js";
import { checkPermission } from "../middleware/checkPermission.js";

const userRouter = Router();

userRouter.get("/users", checkPermission, getAll);
userRouter.get("/users/:id", checkPermission, getOne);
export default userRouter;
