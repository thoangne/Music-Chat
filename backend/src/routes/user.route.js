import { Router } from "express";
import dotenv from "dotenv";

const router = Router();

router.get("/", (req, res) => {
  req.auth.userId;
  res.send("User route is working");
});
router.post("/", (req, res) => {
  res.send("User route is working");
});
router.delete("/", (req, res) => {
  res.send("User route is working");
});

export default router;
