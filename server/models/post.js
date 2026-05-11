import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  userId: String,
  replies: [],
}, { timestamps: true });

export default mongoose.model("Post", postSchema);