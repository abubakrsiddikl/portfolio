"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Facebook, Download } from "lucide-react";
import profileImage from "../../../../public/profile.jpeg";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_40%,_transparent_100%)] opacity-30 animate-pulse"></div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="flex-1 space-y-6"
        >
          <p className="text-lg text-purple-400 font-medium tracking-wide">
            I am Abu Bakr
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            <span className="text-white">Web Developer</span>{" "}
            <motion.span
              className="text-purple-500 inline-block"
              animate={{ textShadow: "0px 0px 12px #a855f7" }}
              transition={{
                repeat: Infinity,
                repeatType: "mirror",
                duration: 1.5,
              }}
            >
              + UX Designer
            </motion.span>
          </h1>

          <p className="text-gray-300 max-w-lg leading-relaxed">
            I build modern web experiences that are visually appealing,
            user-friendly, and focused on connecting ideas with people.
          </p>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="default"
                className="relative bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 group"
              >
                <span className="absolute inset-0 rounded-md blur-lg bg-purple-500 opacity-30 group-hover:opacity-70 transition duration-500"></span>
                <Download className="w-4 h-4 z-10" />{" "}
                <span className="z-10">Download CV</span>
              </Button>
            </motion.div>

            <div className="flex gap-4">
              {[Github, Linkedin, Facebook].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  className="hover:text-purple-400 transition"
                >
                  <Icon size={22} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          whileHover={{
            rotate: 3,
            scale: 1.05,
            transition: { duration: 0.3 },
          }}
          className="flex-1 flex justify-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-2xl overflow-hidden shadow-[0_0_30px_#6d28d9] rotate-3 border border-purple-800 bg-[#0f0225]/70 backdrop-blur-sm">
            <Image
              src={profileImage}
              alt="Profile"
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
