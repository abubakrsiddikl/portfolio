"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function AboutSummary() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 leading-relaxed mb-6"
        >
          I’m a passionate Full-Stack Developer specializing in building modern web
          applications using Next.js, Express, and Prisma. I love solving complex
          problems and creating impactful digital experiences.
        </motion.p>
        <Button
          asChild
          className="bg-indigo-500 hover:bg-indigo-600 text-white transition-all duration-300"
        >
          <a href="/about">Read More →</a>
        </Button>
      </div>
    </section>
  );
}
