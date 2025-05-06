import express from "express";
import { createBlog, getBlogs } from "../controllers/blogController.js";

const router = express.Router();

router.post("/create", createBlog);
router.get("/getall", getBlogs);

export default router;
