import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Album route is working");
});

export default router;
