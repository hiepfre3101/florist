import express from "express";
import {
  clearToken,
  createAccount,
  getToken,
  signin,
} from "../controllers/auth.js";
import { checkPermission } from "../middleware/checkPermission.js";

const router = express.Router();

router.post("/signup", createAccount);
router.post("/signin", signin);
router.get("/token", getToken);
router.delete("/clear-token", clearToken);
export default router;
