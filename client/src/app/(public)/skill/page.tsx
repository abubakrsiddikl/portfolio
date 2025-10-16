import SkillCard from "@/components/modules/Skills/SkillCard";
import { getAllSkills } from "@/services";
import React from "react";

export default async function SkillsPage() {
  const getAllSkill = await getAllSkills();
  console.log(getAllSkill);
  return (
    <section className="relative min-h-screen  bg-gradient-to-tr from-[#0a021f] via-[#120336] to-[#1a0449] text-white overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#6d28d9_40%,_transparent_100%)] opacity-30 animate-fade-glow-once"></div>
      <div className="container mx-auto px-6 md:px-12 relative z-10 mt-15">
        <h1 className="text-center mb-5 text-2xl border transition-colors">
          All Project
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {getAllSkill.map((skill) => (
            <SkillCard key={skill._id} skill={skill}></SkillCard>
          ))}
        </div>
      </div>
    </section>
  );
}
