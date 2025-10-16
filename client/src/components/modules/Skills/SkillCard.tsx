"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { motion } from "framer-motion";
import { ISkill } from "@/services";

interface Props {
  skill: ISkill;
}

export default function SkillCard({ skill }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <Card
        className="group relative bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] 
        border border-purple-800/30 rounded-2xl overflow-hidden shadow-lg 
        transition-all duration-500 hover:shadow-purple-500/40"
      >
        {/* Background animated glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#6d28d9_20%,_transparent_70%)] opacity-0 group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />

        <CardContent className="relative z-10 flex flex-col items-center justify-center p-6 space-y-4 text-center">
          {/* Skill Icon */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center"
          >
            <Image
              src={skill.icon}
              alt={skill.name}
              width={80}
              height={80}
              className="object-contain drop-shadow-lg"
            />
          </motion.div>

          {/* Name (show on hover only) */}
          <motion.h3 className="text-lg font-semibold text-white transition-opacity duration-500">
            {skill.name}
          </motion.h3>

          {/* Level badge */}
          <motion.span
            className="text-xs px-3 py-1 rounded-full bg-purple-700/30 text-purple-300 
            border border-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          >
            {skill.level}
          </motion.span>
        </CardContent>
      </Card>
    </motion.div>
  );
}
