import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import usersRouter from "./routes/user.route.js";
import adminRouter from "./routes/admin.route.js";
import statsRouter from "./routes/stats.route.js";
import songsRouter from "./routes/songs.route.js";
import albumsRouter from "./routes/album.route.js";
import authRouter from "./routes/auth.route.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/songs", songsRouter);
app.use("/api/albums", albumsRouter);
app.use("/api/stats", statsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
