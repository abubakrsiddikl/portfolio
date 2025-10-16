import { Skill } from "./skill.model";
import { ISkill } from "./skill.interface";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";

const createSkill = async (payload: ISkill) => {
  const result = await Skill.create(payload);
  return { data: result };
};

const getAllSkills = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Skill.find(), query);

  const projects = queryBuilder.search(["name"]).filter().sort().paginate();

  // const meta = await queryBuilder.getMeta();
  const [data, meta] = await Promise.all([
    projects.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

const getSingleSkill = async (id: string) => {
  const result = await Skill.findById(id);
  return { data: result };
};

const updateSkill = async (id: string, payload: Partial<ISkill>) => {
  const existingSkill = await Skill.findById(id);
  if (!existingSkill) {
    throw new Error("Blog not found");
  }

  if (payload.icon && existingSkill.icon) {
    await deleteImageFromCLoudinary(existingSkill.icon);
  }
  const updatedSkill = await Skill.findByIdAndUpdate(id, payload, {
    new: true,
  });
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
