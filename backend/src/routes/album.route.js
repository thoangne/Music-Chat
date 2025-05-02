import { Router } from "express";
import { getAlbumById, getAllAlbum } from "../controllers/album.controller.js";
const router = Router();

router.get("/", getAllAlbum);
router.get("/:albumId", getAlbumById);

export default router;
