import { env } from "@/config/env";
import { apiRequest } from "../apiClient";
import { ISkill } from "./skill.type";

// get all skill
export const getAllSkills = async () => {
  const res = await apiRequest<ISkill[]>("/skill");
  return res.data;
};

// create new blog
export const addNewSkill = async (payload: FormData) => {
  const res = await apiRequest("/skill/create", {
    method: "POST",
    body: payload,
  });
  return res;
};

// delete skill
export const deleteSkill = async (id: string) => {
  const res = await apiRequest(`/skill/delete/${id}`, {
    method: "DELETE",
  });
  return res;
};

// update skill
export const updateSkill = async (id: string, payload: FormData) => {
  const res = await apiRequest(`/project/update/${id}`, {
    method: "PATCH",
    body: payload,
  });
  return res;
};
