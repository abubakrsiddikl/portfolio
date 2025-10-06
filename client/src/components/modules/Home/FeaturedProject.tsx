"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const projects = [
  { title: "Howladar Prokashoni", desc: "Full-stack bookstore management app", link: "#" },
  { title: "SwiftSend", desc: "Parcel delivery tracking system", link: "#" },
  { title: "Chatify", desc: "Real-time chat app using Socket.io", link: "#" },
];

export default function FeaturedProjects() {
  return (
    <section className="py-16 bg-[#0f172a] text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <Card className="bg-gradient-to-br from-indigo-600/10 to-purple-700/10 hover:from-indigo-500/20 hover:to-purple-600/20 border-indigo-500/20 shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.desc}</p>
                  <a href={project.link} className="text-indigo-400 hover:underline">
                    View Project →
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
