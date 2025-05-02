import { Router } from "express";
import {
  getFeaturedSongs,
  getAllSongs,
  getMadeForYouSongs,
  getTrendingSongs,
} from "../controllers/song.controller.js";
import { protectRoute, requireAdmin } from "../middlewares/auth.middleware.js";
const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/feature", getFeaturedSongs);
router.get("/trending", getTrendingSongs);
router.get("/madeforyou", getMadeForYouSongs);
export default router;
