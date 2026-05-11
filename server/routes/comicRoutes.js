import express from "express";
import {
  createComic,
  getComics,
  getComic,
  deleteComic,
} from "../controllers/comicController.js";

const router = express.Router();

router.post("/", createComic);
router.get("/", getComics);
router.get("/:id", getComic);
router.delete("/:id", deleteComic);

export default router;