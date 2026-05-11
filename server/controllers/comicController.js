import Comic from "../models/comic.js";

// CREATE CHAPTER
export const createComic = async (req, res) => {
  const comic = await Comic.create(req.body);
  res.json(comic);
};

// GET ALL CHAPTERS
export const getComics = async (req, res) => {
  const comics = await Comic.find().sort({ chapterNumber: 1 });
  res.json(comics);
};

// GET SINGLE CHAPTER
export const getComic = async (req, res) => {
  const comic = await Comic.findById(req.params.id);
  res.json(comic);
};

// DELETE CHAPTER
export const deleteComic = async (req, res) => {
  await Comic.findByIdAndDelete(req.params.id);
  res.json({ message: "Comic deleted" });
};