import { getAllRecentBlog } from "@/services";
import BlogCard from "../Blogs/BlogCard";

export default async function RecentBlogs() {
  const recentBlogs = await getAllRecentBlog();
  return (
    <section className="relative min-h-screen  bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_40%,_transparent_100%)] opacity-30 animate-pulse"></div>
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Recent Blogs</h2>
        <div className="grid grid-cols-3 gap-4">
          {recentBlogs.map((blog) => (
            <BlogCard blog={blog} key={blog._id}></BlogCard>
          ))}
        </div>
      </div>
    </section>
  );
}
