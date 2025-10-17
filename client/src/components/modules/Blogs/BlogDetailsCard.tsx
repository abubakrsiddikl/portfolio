"use client";


import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye } from "lucide-react";
import { IBlog } from "@/services";

interface BlogDetailsCardProps {
  blog: IBlog;
}

export default function BlogDetailsCard({ blog }: BlogDetailsCardProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden py-20">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#6d28d9_25%,_transparent_90%)] opacity-30"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Back Button */}
        <Link href="/blog">
          <Button
            variant="default"
            className="bg-[#6f09b8] flex items-center gap-2 cursor-pointer mb-10 hover:bg-[#7b18c7] transition-all"
          >
            <ArrowLeft size={18} /> Back to Blogs
          </Button>
        </Link>

        {/* Thumbnail */}
        <Card className="bg-indigo-950/20 border border-indigo-800/40 shadow-2xl backdrop-blur-md mb-14">
          <div className="relative w-full h-[300px] md:h-[300px]">
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              priority
              className="object-cover rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
          </div>
        </Card>

        {/* Blog Title & Info */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-indigo-300 mb-3">
            {blog.title}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-600/40 rounded-full text-indigo-300">
              {blog.category}
            </span>
            <span className="flex items-center gap-1">
              <Eye size={16} /> {blog.views} views
            </span>
            <span>
              Published on{" "}
              <span className="text-indigo-300">
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </span>
          </div>
        </motion.div>

        {/* Blog Content */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-indigo-950/20 border border-indigo-800/40 shadow-md py-8 px-6 md:px-10 leading-relaxed text-gray-300">
            <CardContent className="space-y-6">
              {blog.content.split("\n").map((para, index) => (
                <p
                  key={index}
                  className="text-lg text-gray-200 leading-8 tracking-wide"
                >
                  {para}
                </p>
              ))}
            </CardContent>
          </Card>
        </motion.div>

        {/* Tags Section */}
        {blog.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12"
          >
            <Card className="bg-indigo-950/20 border border-indigo-800/40 shadow-md py-5 px-3">
              <CardHeader>
                <CardTitle className="text-indigo-400 text-2xl text-center">
                  🏷️ Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-3">
                  {blog.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-600/40 text-indigo-300 text-sm font-medium hover:bg-indigo-600/20 transition"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-sm text-gray-400 text-center mt-10"
        >
          <p>
            Last updated on{" "}
            <span className="text-indigo-300">
              {new Date(blog.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
