"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ISkill } from "@/services";

interface Props {
  skill: ISkill;
  index?: number; // skill serial অনুযায়ী ছোট delay দিতে
}

export default function SkillCard({ skill, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.08,
        rotate: 1,
        boxShadow: "0 0 25px rgba(99,102,241,0.5)",
      }}
      whileTap={{ scale: 0.96 }}
      className="relative flex flex-col items-center justify-center text-center 
                 border border-indigo-400 
                 rounded-2xl p-4 md:p-6 cursor-pointer transition-all duration-300 
                 hover:border-indigo-400/50"
    >
      {/* subtle glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent rounded-2xl blur-xl" />

      {/* Skill Icon */}
      <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center mb-3">
        <Image
          src={skill.icon}
          alt={skill.name ?? "skill icon"}
          width={80}
          height={80}
          className="object-contain drop-shadow-lg"
        />
      </div>

      {/* Skill Name */}
      <p className="text-gray-200 font-medium text-sm md:text-base tracking-wide">
        {skill.name}
      </p>
    </motion.div>
  );
}
