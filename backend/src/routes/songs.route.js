import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.send("Songs route is working");
});
export default router;
