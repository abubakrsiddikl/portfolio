import { Skill } from "./skill.model";
import { ISkill } from "./skill.interface";

const createSkill = async (payload: ISkill) => {
  const result = await Skill.create(payload);
  return { data: result };
};

const getAllSkills = async (query: Record<string, string>) => {
  const { category, level } = query;
  const filter: Record<string, string> = {};
  if (category) filter.category = category;
  if (level) filter.level = level;

  const result = await Skill.find(filter).sort({ createdAt: -1 });
  return { data: result };
};

const getSingleSkill = async (id: string) => {
  const result = await Skill.findById(id);
  return { data: result };
};

const updateSkill = async (id: string, payload: Partial<ISkill>) => {
  const updatedSkill = await Skill.findByIdAndUpdate(id, payload, { new: true });
  return { data: updatedSkill };
};

const deleteSkill = async (id: string) => {
  const deletedSkill = await Skill.findByIdAndDelete(id);
  return { data: deletedSkill };
};

export const SkillServices = {
  createSkill,
  getAllSkills,
  getSingleSkill,
  updateSkill,
  deleteSkill,
};
