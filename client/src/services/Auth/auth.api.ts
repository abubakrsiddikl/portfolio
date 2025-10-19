"use server";
import { FieldValues } from "react-hook-form";
import { apiRequest } from "../apiClient";
import { ILoginResponse, IUser } from "./auth.type";
import { cookies } from "next/headers";

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
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.success) {
      const cookiesStore = await cookies();
      cookiesStore.set("accessToken", res?.data?.accessToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        path: "/",
      });
    }

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getLoggedInUser = async () => {
  const res = await apiRequest<IUser>("/user/me");
  return res;
};

// export const login= async (data: any) => {
//   const res = await fetch(`${env.baseUrl}/auth/login`, {
//     method: "POST",
//     credentials: "include",
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   if (!res?.ok) {
//     // console.error('User login failed!', await res.text());
//     await res.text();
//   }
//   const result = await res.json();
//   if (result?.success) {
//     // console.log('User login successful!', result);
//     const cookiesStore = await cookies();
//     cookiesStore.set("accessToken", result?.data?.accessToken, {
//       httpOnly: true,
//       sameSite: "none",
//       secure: true,
//       path: "/",
//     });
//   }
// };

// login

export const logout = async () => {
  const res = await apiRequest("/auth/logout", {
    method: "POST",
  });
  const cookieStore = await cookies();

  cookieStore.set({
    name: "accessToken",
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
  return res;
};
