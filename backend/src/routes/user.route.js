import { Router } from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getAllUsers } from "../controllers/user.controller.js";
import dotenv from "dotenv";

const router = Router();

router.get("/", protectRoute, getAllUsers);
//todo: getmessage

export default router;
