import { FieldValues } from "react-hook-form";
import { apiRequest } from "../apiClient";
import { ILoginResponse, IUser } from "./auth.type";

// register
export const register = async (payload: FieldValues) => {
  const res = await apiRequest<IUser>("/user/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return res;
};

// login
export const login = async (payload: FieldValues) => {
  try {
    const res = await apiRequest<ILoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

// login
export const logout = async () => {
  const res = await apiRequest("/auth/logout", {
    method: "POST",
  });
  return res;
};
