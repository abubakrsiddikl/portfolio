"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { ExternalLink, ArrowRight, Code2 } from "lucide-react";
import Link from "next/link";
import { IProject } from "@/services";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: IProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
      className="w-full"
    >
      <Card className="group relative overflow-hidden rounded-2xl shadow-md bg-gradient-to-br from-[#0a021f] via-[#120336] to-[#1a0449] hover:shadow-2xl transition-all duration-500 border-[4px] text-white">
        {/* Thumbnail */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={project.projectImages?.[0] || "/placeholder.png"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110 opacity-90"
          />
          {project.isFeatured && (
            <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
              Featured
            </span>
          )}
        </div>

        {/* Content */}
        <CardContent className="p-5 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm mt-1 line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-indigo-500/10 border border-indigo-600/50 text-indigo-300 font-medium px-2.5 py-1 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex  items-center justify-center lg:justify-between px-5 pb-5 gap-3">
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {project.githubFrontend && (
              <Link
                href={project.githubFrontend}
                target="_blank"
                className="text-gray-300 hover:text-indigo-400  transition hidden lg:flex items-center gap-1 text-sm"
                aria-label="Frontend Code"
              >
                <Code2 size={16} /> Code
              </Link>
            )}
            {project.liveLink && (
              <Link
                href={project.liveLink}
                target="_blank"
                className="text-gray-300 hover:text-indigo-400 transition flex items-center gap-1 text-sm"
                aria-label="Live Project"
              >
                <ExternalLink size={16} /> Live
              </Link>
            )}
          </div>

          {/* Details Button */}
          <div>
            <Link href={`/projects/${project.slug}`}>
              <Button
                size="sm"
                className="bg-[#6f09b8] flex items-center gap-2 cursor-pointer"
              >
                View Project
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </CardFooter>

        {/* Hover Gradient Overlay */}
      </Card>
    </motion.div>
  );
}
