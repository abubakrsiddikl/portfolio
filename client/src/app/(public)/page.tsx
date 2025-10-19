import AboutSummary from "@/components/modules/Home/AboutMe";
import FeaturedProjects from "@/components/modules/Home/FeaturedProject";
import HeroSection from "@/components/modules/Home/HeroSection";
import RecentBlogs from "@/components/modules/Home/RecentBlog";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

//  SEO Meta Data
export const metadata: Metadata = {
  metadataBase: new URL("https://abubakrsiddik-portfolio.vercel.app"),
  title: "Abu Bakr Siddik | Full Stack Web Developer (MERN & Next.js)",
  description:
    "I'm Abu Bakr Siddik — a passionate full-stack web developer skilled in TypeScript, React, Next.js, Express.js, and MongoDB, Mongoose, Prisma, Postgres, SQL , sql . I create modern, scalable, and user-focused web applications that deliver real-world impact. Explore my projects, blogs, and journey.",
  keywords: [
    "Abu Bakr Siddik",
    "Web Developer",
    "Full Stack Developer",
    "MERN Stack Developer",
    "Next.js Developer",
    "React Developer",
    "JavaScript",
    "TypeScript",
    "Portfolio",
    "Bangladesh Developer",
    "Frontend Developer",
    "Backend Developer",
  ],
  openGraph: {
    title: "Abu Bakr Siddik | Full Stack Developer Portfolio",
    description:
      "Welcome to my personal portfolio. I specialize in building responsive, modern, and high-performance web applications using React, Next.js, Express.js, and MongoDB.",
    url: "https://abubakrsiddik-portfolio.vercel.app",
    siteName: "Abu Bakr Siddik Portfolio",
    images: [
      {
        url: "https://abubakrsiddik-portfolio.vercel.app/og-image.png", // 🔹 Replace with your real OG image path
        width: 1200,
        height: 630,
        alt: "Abu Bakr Siddik Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abu Bakr Siddik | Full Stack Web Developer",
    description:
      "Hi, I'm Abu Bakr Siddik — a MERN stack and Next.js developer building clean, performant web applications.",
    images: ["https://abubakrsiddik-portfolio.vercel.app/og-image.png"],
    creator: "@abubakrsiddik", // Optional: add if you have Twitter handle
  },
  authors: [{ name: "Abu Bakr Siddik" }],
  creator: "Abu Bakr Siddik",
  publisher: "Abu Bakr Siddik",
  alternates: {
    canonical: "https://abubakrsiddik-portfolio.vercel.app",
  },
};

export default function Home() {
  return (
    <>
      <section className="relative min-h-screen bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden">
        {/*  bg-gradient-to-br from-[#0a021f] via-[#120336] to-[#1a0449] */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_40%,_transparent_50%)] opacity-30 --animate-fade-glow-once"></div> */}

        <HeroSection />
        <AboutSummary />
        <FeaturedProjects></FeaturedProjects>
        <RecentBlogs></RecentBlogs>
      </section>
    </>
  );
}
