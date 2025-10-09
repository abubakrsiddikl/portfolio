"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Me", href: "about" },
    { name: "Project", href: "project" },
    { name: "Skills", href: "skill" },
    { name: "Blogs", href: "blog" },
    { name: "Contact", href: "contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#0a021f]/90 via-[#120336]/90 to-[#1a0449]/90 backdrop-blur-xl border-b border-purple-700/30"
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center h-16 ">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            animate={{
              textShadow: "0px 0px 10px #a855f7",
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
            }}
            className="text-2xl font-extrabold text-purple-400"
          >
            G
          </motion.div>
          <span className="text-white font-semibold tracking-wider">
            Gerold
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link, index) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`/${link.href}`);
            return (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.1,
                  textShadow: "0px 0px 10px #a855f7",
                }}
              >
                <Link
                  href={link.href}
                  className={`transition-colors duration-300 font-medium ${
                    isActive
                      ? "text-purple-400 border-b-2 border-purple-500 pb-1"
                      : "text-gray-300 hover:text-purple-400"
                  }`}
                >
                  {link.name}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Hire Me Button */}
        <div className="hidden md:block">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_15px_#6d28d9] hover:shadow-[0_0_25px_#a855f7] transition-all duration-300">
              Hire Me
            </Button>
          </motion.div>
        </div>

        {/* Mobile Drawer */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                className="text-white hover:bg-purple-900/40"
              >
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-gradient-to-b from-[#0a021f] via-[#120336] to-[#1a0449] border-l border-purple-700/30 text-white"
            >
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold text-purple-400">
                  Menu
                </span>
                <Button
                  variant="ghost"
                  className="text-gray-300 hover:text-purple-400"
                >
                  <X />
                </Button>
              </div>
              <div className="flex flex-col gap-6">
                {/* {navLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    whileHover={{
                      scale: 1.05,
                      color: "#a855f7",
                    }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Link
                      href={link.href}
                      className="text-lg font-medium hover:text-purple-400 transition"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))} */}
                {navLinks.map((link, index) => {
                  const isActive =
                    pathname === link.href ||
                    pathname.startsWith(`/${link.href}`);
                  return (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, color: "#a855f7" }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <Link
                        href={link.href}
                        className={`text-lg font-medium transition ${
                          isActive
                            ? "text-purple-400"
                            : "text-gray-300 hover:text-purple-400"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}

                <Button className="bg-purple-600 hover:bg-purple-700 mt-6 text-white">
                  Hire Me
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
