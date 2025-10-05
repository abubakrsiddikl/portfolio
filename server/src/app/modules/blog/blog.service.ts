import { Blog } from "./blog.model";
import { IBlog } from "./blog.interface";
import { JwtPayload } from "jsonwebtoken";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";

//  Create Blog
const createBlog = async (payload: IBlog, decodedToken: JwtPayload) => {
  const userId = decodedToken?.userId;
  const newBlog = await Blog.create({
    ...payload,
    author: userId,
  });
  return { data: newBlog };
};

//  Get All Blogs
const getAllBlogs = async () => {
  const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
  return { data: blogs };
};

//  Get Single Blog by Slug
const getBlogBySlug = async (slug: string) => {
  const blog = await Blog.findOne({ slug });
  return { data: blog };
};

// Update Blog (Owner Only)
const updateBlog = async (id: string, payload: Partial<IBlog>) => {
  const existingBlog = await Blog.findById(id);
  if (!existingBlog) {
    throw new Error("Blog not found");
  }

  if (payload.thumbnail && existingBlog.thumbnail) {
    await deleteImageFromCLoudinary(existingBlog.thumbnail);
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return { data: updatedBlog };
};
//  Delete Blog (Owner Only)
const deleteBlog = async (id: string) => {
  const deleted = await Blog.findByIdAndDelete(id);
  return { data: deleted };
};

export const BlogServices = {
  createBlog,
  getAllBlogs,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
