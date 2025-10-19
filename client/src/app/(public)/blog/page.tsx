import BlogCard from "@/components/modules/Blogs/BlogCard";
import { getAllBlogs } from "@/services";

export const dynamic = "force-dynamic"

export default async function AllBlogs() {
  const getAllBlog = await getAllBlogs("/blog?limit=10");

  return (
    <section className="relative min-h-screen  bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_40%,_transparent_100%)] opacity-0 animate-fade-glow-once"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {getAllBlog.map((blog) => (
            <BlogCard key={blog._id} blog={blog}></BlogCard>
          ))}
        </div>
      </div>
    </section>
  );
}
