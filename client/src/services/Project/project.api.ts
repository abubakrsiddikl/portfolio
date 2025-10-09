import { apiRequest } from "../apiClient";
import { IProject } from "./project.type";

export const getAllProjects = async (): Promise<IProject[]> => {
  const res = await apiRequest<IProject[]>("/project?limit=10");
  return res.data;
};

export const getAllRecentProject = async (): Promise<IProject[]> => {
  const res = await apiRequest<IProject[]>("/project?limit=3");
  return res.data;
};
