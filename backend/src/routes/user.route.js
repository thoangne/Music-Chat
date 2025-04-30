import { Router } from "express";
import dotenv from "dotenv";

const router = Router();

router.get("/", (req, res) => {
  res.send("User route is working");
});

export default router;
