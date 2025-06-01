import express from "express";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./lib/socket.js";
import fs from "fs";
import mongoose from "mongoose";
import { connectDB } from "./lib/db.js";
import usersRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import statsRouter from "./routes/stats.route.js";
import songsRouter from "./routes/songs.route.js";
import albumsRouter from "./routes/album.route.js";
import authRouter from "./routes/auth.route.js";
import path from "path";
import cron from "node-cron";
import fileUpload from "express-fileupload";
import { clerkMiddleware } from "@clerk/express";
import dotenv from "dotenv";
dotenv.config();
const __dirname = path.resolve();
const app = express();
const PORT = process.env.PORT || 5000;
const httpServer = createServer(app);
initializeSocket(httpServer);
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024,
    },
  })
);
//cron jobs
const tempDir = path.join(process.cwd(), "tmp");
//delete those files in every hours
cron.schedule("0 * * * *", () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.log(err, "error");
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) => {
          if (err) {
            console.log(err, "error");
            return;
          }
        });
      }
    });
  }
});

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/stats", statsRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
app.use((err, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

//todo: socket.io
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
