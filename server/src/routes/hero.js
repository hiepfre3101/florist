import { Router } from "express";
import { create, getAll } from "../controllers/hero.js";

const heroRouter = Router();

heroRouter.get("/heros", getAll);
heroRouter.post("/heros", create);
export default heroRouter;
