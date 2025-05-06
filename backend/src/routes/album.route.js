import { Router } from "express";
import { getAlbumById, getAllAlbum } from "../controllers/album.controller.js";
const router = Router();

router.get("/:albumId", getAlbumById);
router.get("/", getAllAlbum);

export default router;
