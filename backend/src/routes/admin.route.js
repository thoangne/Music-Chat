import { Router } from "express";
import {
  createSong,
  checkAdmin,
  deleteSong,
  deleteAlbum,
  createAlbum,
} from "../controllers/admin.controller.js";
import { requireAdmin, protectRoute } from "../middlewares/auth.middleware.js";
const router = Router();

router.use(protectRoute, requireAdmin);
router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.delete("/ablums/:id", deleteAlbum);
router.post("/ablums", createAlbum);
export default router;
