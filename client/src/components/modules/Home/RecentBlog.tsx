import { getAllBlogs } from "@/services";
import BlogCard from "../Blogs/BlogCard";

export default async function RecentBlogs() {
  const recentBlogs = await getAllBlogs("/blog?limit=3");
  return (
    <section>
      <div className="container mx-auto px-6 md:px-12 relative z-10 mt-15">
        <h2 className="text-3xl font-bold text-center mb-10">Recent Blogs</h2>
        <div className="grid md:grid-cols-3 gap-8 mb-5">
          {recentBlogs.map((blog) => (
            <BlogCard blog={blog} key={blog._id}></BlogCard>
          ))}
        </div>
      </div>
    </section>
  );
}
