import { apiRequest } from "../apiClient";
import { IBlog } from "./blog.type";

// get all blog
export const getAllBlogs = async (): Promise<IBlog[]> => {
  const res = await apiRequest<IBlog[]>("/blog");
  return res.data;
};

export const getAllRecentBlog = async (): Promise<IBlog[]> => {
  const res = await apiRequest<IBlog[]>("/blog?limit=3",);
  return res.data;
};


export const addNewBlog = async(payload:FormData)=>{
  const res = await apiRequest("/blog/create",{
    method: "POST",
    body: payload
  });
  return res
};