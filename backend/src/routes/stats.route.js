import { Router } from "express";
import dotenv from "dotenv";

const router = Router();

router.get("/", (req, res) => {
  res.send("Stats route is working");
});

export default router;
