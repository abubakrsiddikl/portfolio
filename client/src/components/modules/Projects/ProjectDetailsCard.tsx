"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Code2, ArrowLeft } from "lucide-react";
import { IProject } from "@/services";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";


interface ProjectDetailsProps {
  project: IProject;
}

export default function ProjectDetailsCard({ project }: ProjectDetailsProps) {
  return (
    <section className="relative min-h-screen bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden py-20">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_30%,_transparent_100%)] opacity-30 animate-fade-glow-once"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Back Button */}
        <Link href="/project">
          <Button
            variant="default"
            className="bg-[#6f09b8] flex items-center gap-2 cursor-pointer mb-10 hover:bg-[#7b18c7] transition-all"
          >
            <ArrowLeft size={18} /> Back to Projects
          </Button>
        </Link>

        {/* Image Slider */}
        <Card className="bg-indigo-950/20 border border-indigo-800/40 shadow-2xl backdrop-blur-md mb-16">
          <CardContent className="p-0">
            <Swiper
              spaceBetween={30}
              centeredSlides={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              modules={[Autoplay, Pagination, Navigation]}
            >
              {project.projectImages?.map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-[400px] md:h-[550px]">
                    <Image
                      src={img}
                      alt={`${project.title} image ${i + 1}`}
                      fill
                      className="object-cover rounded-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl font-bold text-indigo-300 mb-4 tracking-wide">
            {project?.title}
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg">
            {project.description}
          </p>
        </motion.div>

        {/* Features */}
        {project.features?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="bg-indigo-950/20 border border-indigo-800/40 shadow-md py-5 px-3">
              <CardHeader>
                <CardTitle className="text-indigo-400 text-2xl">
                  ✨ Key Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-gray-300 list-disc pl-5">
                  {project.features.map((feature, index) => (
                    <li
                      key={index}
                      className="hover:text-indigo-400 transition"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Technologies */}
        {project.technologies?.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Card className="bg-indigo-950/20 border border-indigo-800/40 shadow-md py-5 px-3">
              <CardHeader>
                <CardTitle className="text-indigo-400 text-2xl">
                  🧠 Technologies Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-600/40 text-indigo-300 text-sm font-medium hover:bg-indigo-600/20 transition"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Action Links */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-5 mb-12"
        >
          {project.githubFrontend && (
            <a
              href={project.githubFrontend}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-indigo-400 flex items-center gap-2 transition"
            >
              <Code2 size={18} /> Frontend Code
            </a>
          )}
          {project.githubBackend && (
            <a
              href={project.githubBackend}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-indigo-400 flex items-center gap-2 transition"
            >
              <Code2 size={18} /> Backend Code
            </a>
          )}
          {project.liveLink && (
            <a
              href={project?.liveLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-[#6f09b8] flex items-center gap-2 hover:bg-[#7b18c7] transition-all duration-300">
                <ExternalLink size={18} /> Explore Live
              </Button>
            </a>
          )}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-sm text-gray-400 text-center"
        >
          <p>
            Published on{" "}
            <span className="text-indigo-300">
              {new Date(project.createdAt).toLocaleDateString("en-US", {
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
