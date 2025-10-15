import { apiRequest } from "../apiClient";
import { IBlog } from "./blog.type";

// get all blog
export const getAllBlogs = async (): Promise<IBlog[]> => {
  const res = await apiRequest<IBlog[]>("/blog",{
    next: {
      revalidate: 30
    }
  });
  return res.data;
};

export const getAllRecentBlog = async (): Promise<IBlog[]> => {
  const res = await apiRequest<IBlog[]>("/blog?limit=3");
  return res.data;
};

// create new blog
export const addNewBlog = async (payload: FormData) => {
  const res = await apiRequest("/blog/create", {
    method: "POST",
    body: payload,
  });
  return res;
};

// delete blog
export const deleteBlog = async (id: string) => {
  const res = await apiRequest(`/blog/delete/${id}`, {
    method: "DELETE",
  });
  return res;
};

// update blog 
export const updateBlog = async(id:string, payload: FormData)=>{
  const res = await apiRequest(`/blog/update/${id}`, {
    method: "PATCH",
    body: payload,
  });
  return res;
};