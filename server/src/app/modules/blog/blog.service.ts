import { Blog } from "./blog.model";
import { IBlog } from "./blog.interface";
import { JwtPayload } from "jsonwebtoken";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
import { QueryBuilder } from "../../utils/QueryBuilder";

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
const getAllBlogs = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Blog.find(), query);

  const blogs = queryBuilder.search(["title"]).filter().sort().paginate();

  // const meta = await queryBuilder.getMeta();
  const [data, meta] = await Promise.all([
    blogs.build().populate("author", "name email -_id"),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

//  Get Single Blog by Slug
const getBlogBySlug = async (slug: string) => {
  // Find the blog and increment views by 1
  const blog = await Blog.findOneAndUpdate(
    { slug },
    { $inc: { views: 1 } }, // views += 1
    { new: true } // updated document return করবে
  );

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
