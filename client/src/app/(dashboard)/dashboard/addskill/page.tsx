import AddSkillModal from "@/components/modules/Skills/Modal/AddSkillModal";
import SkillTable from "@/components/modules/Skills/Table/SkillTable";
import { getAllSkills } from "@/services";

export default async function SkillsPage() {
  const getAllSkill = await getAllSkills();
  return (
    <div>
      {/* skill add modal */}
      <div className="flex justify-end items-center mb-5">
        <AddSkillModal></AddSkillModal>
      </div>
      {/* skill */}
      <div>
        <SkillTable skills={getAllSkill || []}></SkillTable>
      </div>
    </div>
  );
}
