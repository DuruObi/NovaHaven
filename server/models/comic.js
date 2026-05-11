import mongoose from "mongoose";

const comicSchema = new mongoose.Schema({
  chapterNumber: Number,
  title: String,
  description: String,
  pages: [{ imageUrl: String, pageNumber: Number }],
});

export default mongoose.model("Comic", comicSchema);
