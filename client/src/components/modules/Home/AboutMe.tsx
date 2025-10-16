"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AboutSummary() {
  return (
    <section>
      {/* Background glow */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 mt-15">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-4 text-center"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-300 leading-relaxed mb-6"
        >
          I’m a passionate Full-Stack Developer specializing in building modern
          web applications using Next.js, Express, and Prisma. I love solving
          complex problems and creating impactful digital experiences.
        </motion.p>
        {/* button */}
        <div className="flex justify-center">
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white transition-all duration-300 ">
            <Link href="/about">Read More →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
