import express from "express";
import { BlogControllers } from "./blog.controller";
import { zodRequestValidate } from "../../middlewares/zodRequestValidate";
import { createBlogZodSchema, updateBlogZodSchema } from "./blog.validation";
import { multerUpload } from "../../config/multer.config";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";

const router = express.Router();

// create blog
router.post(
  "/create",
  multerUpload.single("file"),
  checkAuth(Role.ADMIN),
  zodRequestValidate(createBlogZodSchema),
  BlogControllers.createBlog
);

// get all blog
router.get("/", BlogControllers.getAllBlogs);

// get single blog
router.get("/:slug", BlogControllers.getBlogBySlug);

// update blog
router.patch(
  "/update/:id",
  multerUpload.single("file"),
  checkAuth(Role.ADMIN),
  zodRequestValidate(updateBlogZodSchema),
  BlogControllers.updateBlog
);

router.delete("/delete/:id", checkAuth(Role.ADMIN), BlogControllers.deleteBlog);

export const BlogRoutes = router;
