import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { connectDB } from "./lib/db.js";
import usersRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import statsRouter from "./routes/stats.route.js";
import songsRouter from "./routes/songs.route.js";
import albumsRouter from "./routes/album.route.js";
import authRouter from "./routes/auth.route.js";
import path from "path";
import fileUpload from "express-fileupload";
import { clerkMiddleware } from "@clerk/express";
import dotenv from "dotenv";
dotenv.config();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());
app.use(
  fileUpload({
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/stats", statsRouter);

app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
