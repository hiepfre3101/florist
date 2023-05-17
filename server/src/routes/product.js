import express from "express";

import { create, getOne, getAll, remove, update } from "../controllers/product.js";
import { checkPermission } from "../middleware/checkPermission.js";

const router = express.Router();

router.get("/products", getAll);
router.get("/products/:id", getOne);
router.post("/products",checkPermission, create);
router.put("/products/:id",checkPermission, update);
router.delete("/products/:id",checkPermission, remove);

export default router;
