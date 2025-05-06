import Blog from "../models/Blog.js";

// POST: Create a blog
export const createBlog = async (req, res) => {
  try {
    const { image, text } = req.body;

    const newBlog = new Blog({
      image: image || "",
      text: text || ""
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog", error });
  }
};

// GET: Fetch all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs", error });
  }
};
