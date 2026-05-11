import express from "express";
import {
  createPost,
  getPosts,
  getPost,
  deletePost,
} from "../controllers/forumController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.delete("/:id", deletePost);

export default router;