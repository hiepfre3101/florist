import { Router } from "express";
import { getAll, getOne } from "../controllers/user";
import { checkPermission } from "../middleware/checkPermission";

const userRouter = Router();

userRouter.get("/users", checkPermission, getAll);
userRouter.get("/users/:id", checkPermission, getOne);
export default userRouter;
