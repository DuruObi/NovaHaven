import Post from "../models/post.js";

// CREATE POST
export const createPost = async (req, res) => {
  const post = await Post.create(req.body);
  res.json(post);
};

// GET ALL POSTS
export const getPosts = async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
};

// GET SINGLE POST
export const getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.json(post);
};

// DELETE POST
export const deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.json({ message: "Post deleted" });
};