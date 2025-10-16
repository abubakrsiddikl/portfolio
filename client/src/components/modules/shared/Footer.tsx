"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Github, Linkedin, Facebook, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white py-10 overflow-hidden">
      {/* Background glow animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_30%,)] opacity-30 animate-pulse"></div>

      <div className="container relative z-10 mx-auto px-6 md:px-12 text-center space-y-6">
        {/* Logo / Name */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl font-extrabold text-purple-400 tracking-wide"
        >
          Abu Bakr Siddik
        </motion.h2>

        {/* Navigation Links */}
        <motion.nav
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-6 text-gray-300"
        >
          {[
            { name: "Home", href: "/" },
            { name: "About", href: "/about" },
            { name: "Projects", href: "/projects" },
            { name: "Blog", href: "/blog" },
            { name: "Contact", href: "/contact" },
          ].map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className="hover:text-purple-400 transition duration-300"
            >
              {link.name}
            </Link>
          ))}
        </motion.nav>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6"
        >
          {[
            { icon: Github, href: "https://github.com/abubakrsiddikl" },
            { icon: Linkedin, href: "https://linkedin.com" },
            { icon: Facebook, href: "https://facebook.com" },
            { icon: Mail, href: "mailto:abubakr@example.com" },
          ].map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className="text-gray-400 hover:text-purple-400 transition"
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="h-px w-3/4 mx-auto bg-gradient-to-r from-transparent via-purple-700 to-transparent opacity-40"></div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          viewport={{ once: true }}
          className="text-gray-400 text-sm"
        >
          © {new Date().getFullYear()} Abu Bakr Siddik — All Rights Reserved.
        </motion.p>
      </div>
    </footer>
  );
}
