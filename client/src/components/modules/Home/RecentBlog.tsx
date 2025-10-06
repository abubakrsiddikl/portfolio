"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const blogs = [
  { title: "Understanding Prisma ORM", date: "Oct 2025", link: "#" },
  { title: "Next.js ISR Explained", date: "Sep 2025", link: "#" },
  { title: "Optimizing API Performance", date: "Aug 2025", link: "#" },
];

export default function RecentBlogs() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Recent Blogs</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="bg-gradient-to-br from-purple-700/10 to-indigo-600/10 hover:from-purple-600/20 hover:to-indigo-500/20 border-purple-500/20 shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-400 mb-1">{blog.date}</p>
                  <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
                  <a
                    href={blog.link}
                    className="text-indigo-400 hover:underline"
                  >
                    Read More →
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
