
import { apiRequest } from "../apiClient";
import {  IProject } from "./project.type";

export const getAllProjects = async (): Promise<IProject[]> => {
  const res = await apiRequest<IProject[]>("/project?limit=10");
  return res.data;
};

export const getAllRecentProject = async (): Promise<IProject[]> => {
  const res = await apiRequest<IProject[]>("/project?limit=3");
  return res.data;
};

export const getProjectBySlug = async (slug: string): Promise<IProject> => {
  const res = await apiRequest<IProject>(`/project/${slug}`);
  return res.data;
};

// create new project
export const addNewProject = async(payload:FormData)=>{
  const res = await apiRequest("/project/create",{
    method: "POST",
    body: payload
  });
  return res
};


// delete blog
export const deleteProject = async (id: string) => {
  const res = await apiRequest(`/project/delete/${id}`, {
    method: "DELETE",
  });
  return res;
};

// update blog 
export const updateProject = async(id:string, payload: FormData)=>{
  const res = await apiRequest(`/project/update/${id}`, {
    method: "PATCH",
    body: payload,
  });
  return res;
};