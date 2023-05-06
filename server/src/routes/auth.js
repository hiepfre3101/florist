import express from "express";
import {
  clearToken,
  createAccount,
  getToken,
  signin,
} from "../controllers/auth";
import { checkPermission } from "../middleware/checkPermission";

const router = express.Router();

router.post("/signup", createAccount);
router.post("/signin", signin);
router.get("/token", getToken);
router.delete("/clear-token", clearToken);
export default router;
