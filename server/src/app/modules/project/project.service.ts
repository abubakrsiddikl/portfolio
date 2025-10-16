import { Project } from "./project.model";
import { IProject } from "./project.interface";
import { JwtPayload } from "jsonwebtoken";
import { deleteImageFromCLoudinary } from "../../config/cloudinary.config";
import { QueryBuilder } from "../../utils/QueryBuilder";

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
const getAllProjects = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Project.find(), query);

  const projects = queryBuilder.search(["title"]).filter().sort().paginate();

  // const meta = await queryBuilder.getMeta();
  const [data, meta] = await Promise.all([
    projects.build().populate("author", "name email -_id"),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};

// get single project by slug
const getSingleProject = async (slug: string) => {
  const project = await Project.findOne({ slug }).populate(
    "author",
    "name email"
  );
  return { data: project };
};

// update project
const updateProject = async (id: string, payload: Partial<IProject>) => {
  const existingProject = await Project.findById(id);

  if (!existingProject) {
    throw new Error("Tour not found.");
  }

  // * add update image
  if (
    payload.projectImages &&
    payload.projectImages.length > 0 &&
    existingProject.projectImages &&
    existingProject.projectImages.length > 0
  ) {
    payload.projectImages = [
      ...payload.projectImages,
      ...existingProject.projectImages,
    ];
  }
  if (
    payload.deleteImages &&
    payload.deleteImages.length > 0 &&
    existingProject.projectImages &&
    existingProject.projectImages.length > 0
  ) {
    const restDBImages = existingProject.projectImages.filter(
      (imageUrl) => !payload.deleteImages?.includes(imageUrl)
    );
    const updatedPayloadImages = (payload.projectImages || [])
      .filter((imageUrl) => !payload.deleteImages?.includes(imageUrl))
      .filter((imageUrl) => !restDBImages.includes(imageUrl));

    payload.projectImages = [...restDBImages, ...updatedPayloadImages];
  }
  const updatedProject = await Project.findByIdAndUpdate(id, payload, {
    new: true,
  });
  if (
    payload.deleteImages &&
    payload.deleteImages.length > 0 &&
    existingProject.projectImages &&
    existingProject.projectImages.length > 0
  ) {
    await Promise.all(
      payload.deleteImages.map((url) => deleteImageFromCLoudinary(url))
    );
  }
  return {
    data: updatedProject,
  };
};

const deleteProject = async (id: string) => {
  const deletedProject = await Project.findByIdAndDelete(id);
  // delete image from cloudinary
  deletedProject?.projectImages?.map((img) => deleteImageFromCLoudinary(img));
  return { data: deletedProject };
};

export const ProjectServices = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
};
