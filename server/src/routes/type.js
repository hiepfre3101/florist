import express from "express";
import { create, getAll, getOne, remove, update } from "../controllers/type";
import { checkPermission } from "../middleware/checkPermission";

const typesRouter = express.Router();

typesRouter.get("/types", getAll);
typesRouter.get("/types/:id", getOne);
typesRouter.post("/types", checkPermission, create);
typesRouter.delete("/types/:id", checkPermission, remove);
typesRouter.put("/types/:id", checkPermission, update);

export default typesRouter;
