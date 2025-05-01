import { Router } from "express";
import getAdmin from "../controllers/admin.controller.js";
import { requireAdmin, protectRoute } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", protectRoute, requireAdmin, createSong);
export default router;
