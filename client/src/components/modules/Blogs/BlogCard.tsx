"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { IBlog } from "@/services";

interface Props {
  blog: IBlog;
}

export default function BlogCard({ blog }: Props) {
  const excerpt = (html: string, len = 130) => {
    const text = html.replace(/<[^>]*>/g, "");
    return text.length > len ? text.slice(0, len).trim() + "…" : text;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card
        className="
    group relative overflow-hidden
    bg-gradient-to-br from-[#0a021f] via-[#120336] to-[#1a0449] 
     rounded-sm 
    shadow-[0_0_25px_rgba(109,40,217,0.25)] 
    hover:shadow-[0_0_45px_rgba(109,40,217,0.55)] 
    backdrop-blur-xl 
    transition-all duration-500
  "
      >
        {/* Background gradient animation overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_#6d28d9_20%,_transparent_60%)] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>

        {/* Thumbnail */}
        <div className="relative w-full aspect-[16/12] overflow-hidden  border-b border-white/10">
          {blog.thumbnail ? (
            <Image
              src={blog.thumbnail}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="bg-gradient-to-br from-purple-700 to-indigo-600 w-full h-full flex items-center justify-center text-white">
              <span className="text-sm font-medium">No Image</span>
            </div>
          )}

          {/* Featured badge */}
          {blog.isFeatured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
              Featured
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="relative z-10 p-5 space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs text-indigo-300 uppercase tracking-wider">
                {blog.category || "General"}
              </p>
              <h3 className="text-lg md:text-xl font-semibold text-white mt-1 group-hover:text-indigo-200 transition-colors duration-300">
                {blog.title}
              </h3>
            </div>

            <div className="flex items-center gap-1 text-gray-300 bg-white/5 px-2 py-1 rounded-md text-sm">
              <Eye className="w-4 h-4 text-purple-300" />
              <span>{blog.views ?? 0}</span>
            </div>
          </div>

          <p className="text-sm text-gray-300 leading-relaxed">
            {excerpt(blog.content, 140)}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {blog.tags?.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-xs bg-indigo-500/10 border border-indigo-600/50 text-indigo-300 font-medium px-2.5 py-1 rounded-full cursor-pointer"
              >
                #{t}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="text-xs text-gray-400">
              <div>
                <span className="text-gray-200 font-medium line-clamp-1">
                  Published On
                </span>
              </div>
              <div className="mt-1">
                {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>

            <Link href={`/blogs/${blog.slug}`}>
              <Button size="sm" className="bg-[#6f09b8] ">
                Read More..
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
