import { Project } from "./project.model";
import { IProject } from "./project.interface";
import { JwtPayload } from "jsonwebtoken";

// create project
const createProject = async (payload: IProject, decodedToken: JwtPayload) => {
  const userId = decodedToken?.userId;
  const project = await Project.create({
    ...payload,
    author: userId,
  });
  return { data: project };
};

// get all project
const getAllProjects = async () => {
  const projects = await Project.find().populate("author", "name email");
  return { data: projects };
};

// get single project by slug
const getSingleProject = async (slug: string) => {
  const project = await Project.findOne({ slug }).populate(
    "author",
    "name email"
  );
  return { data: project };
};

const updateProject = async (id: string, payload: Partial<IProject>) => {
  const updated = await Project.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return { data: updated };
};

const deleteProject = async (id: string) => {
  const deleted = await Project.findByIdAndDelete(id);
  return { data: deleted };
};

export const ProjectServices = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
