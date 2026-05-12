import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import forumRoutes from "./routes/forumRoutes.js";
import comicRoutes from "./routes/comicRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("NovaHaven API Running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/comics", comicRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  if (!process.env.MONGO_URI) {
    console.error("No MongoDB connection string defined in .env. Please set MONGO_URI.");
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MongoDB connected: ${process.env.MONGO_URI ? "pending" : "false"}`);
  });
};

startServer();