import express from "express";
import { getAdminMetrics } from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/metrics", verifyToken, getAdminMetrics);

export default router;
