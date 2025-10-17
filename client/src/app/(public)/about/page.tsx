"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import profile from "../../../../public/profile.jpeg";

export default function AboutPage() {
  return (
    <section className="relative min-h-screen bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden py-20">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#6d28d9_25%,_transparent_90%)] opacity-30" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-indigo-300"
        >
          About Me
        </motion.h1>

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative w-56 h-56 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg"
          >
            <Image
              src={profile}
              alt="Abu Bakr Siddik"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Intro Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1"
          >
            <h2 className="text-2xl font-semibold mb-3 text-indigo-300">
              Hi, I’m Abu Bakr Siddik 👋
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              I’m a passionate{" "}
              <span className="text-indigo-400">Full-Stack Web Developer</span>{" "}
              who loves building modern, user-focused web applications using{" "}
              <span className="text-indigo-400">
                Next.js, Express.js, and TypeScript
              </span>
              . I focus on writing clean, maintainable code and solving real-world
              problems with scalable backend solutions.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Currently I’m expanding my knowledge in{" "}
              <span className="text-indigo-400">System Design</span> and{" "}
              <span className="text-indigo-400">Machine Learning</span> to
              become a well-rounded engineer.
            </p>
          </motion.div>
        </div>

        {/* Core Tech Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-indigo-950/20 border border-indigo-800/40 shadow-md backdrop-blur-md rounded-2xl p-8 mb-16 text-center"
        >
          <h3 className="text-2xl font-semibold text-indigo-300 mb-6">
            🧠 My Core Technologies
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-8">
            {[
              "Next.js",
              "Express.js",
              "TypeScript",
              "MongoDB (with Mongoose & Prisma)",
              "Tailwind CSS",
              "SQL",
            ].map((skill, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-indigo-500/10 border border-indigo-700/40 rounded-full text-indigo-300 font-medium hover:bg-indigo-600/20 transition"
              >
                {skill}
              </span>
            ))}
          </div>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-5 py-2 transition-all duration-300">
            <Link href="/skill">View All Skills →</Link>
          </Button>
        </motion.div>

        {/* Journey Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center text-gray-300 leading-relaxed mb-16"
        >
          <h3 className="text-2xl font-semibold text-indigo-300 mb-4">
            🚀 My Developer Journey
          </h3>
          <p>
            I began my web development journey with pure curiosity and a drive
            to create something meaningful. Since then, I’ve built projects like{" "}
            <span className="text-indigo-400">
              SwiftSend (parcel delivery platform)
            </span>{" "}
            and{" "}
            <span className="text-indigo-400">
              Howladar Prokashoni (bookstore management system)
            </span>
            . Each project helped me grow technically and professionally — from
            frontend UI design to backend architecture and deployment.
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-xl font-semibold text-indigo-300 mb-4">
            💬 Want to collaborate or hire me?
          </h3>
          <p className="text-gray-400 mb-6">
            I’m always open to exciting opportunities and collaborations.
          </p>
          <Button className="bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-6 py-3 transition-all duration-300">
            <Link href="/contact">Let’s Connect →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
