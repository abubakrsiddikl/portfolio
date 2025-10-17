"use client";

import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import logo from "../../../../public/logo.png";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const session = useSession();
  const navLinks = [
    { name: "Home", href: "/", role: "PUBLIC" },
    { name: "About Me", href: "/about", role: "PUBLIC" },
    { name: "Project", href: "/project", role: "PUBLIC" },
    { name: "Skills", href: "/skill", role: "PUBLIC" },
    { name: "Blogs", href: "/blog", role: "PUBLIC" },
    { name: "Contact", href: "/contact", role: "PUBLIC" },
    { name: "Dashboard", href: "/dashboard", role: "ADMIN" },
  ];
  const filteredNavLinks = navLinks.filter((link) => {
    if (link.role === "PUBLIC") {
      return true;
    }

    if (link.role === "ADMIN" && session.status === "authenticated") {
      return true;
    }

    return false;
  });

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#250b57] to-[#320f70]  backdrop-blur-xl "
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
            <Image
              src={logo}
              alt="logo"
              width={30}
              height={30}
              className="rounded"
            ></Image>
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {filteredNavLinks.map((link, index) => {
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
            {!session.data?.user.email && (
              <Link href={"/login"}>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_15px_#6d28d9] hover:shadow-[0_0_25px_#a855f7] transition-all duration-300">
                  Login
                </Button>
              </Link>
            )}
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
              side="left"
              className="pl-15 bg-gradient-to-b from-[#0a021f] via-[#120336] to-[#1a0449] border-l border-purple-700/30 text-white"
            >
              <div className="flex justify-between items-center mb-6"></div>
              <div className="flex flex-col gap-6">
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

                <Button className=" max-w-max bg-purple-600 hover:bg-purple-700 mt-6 text-white ">
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
