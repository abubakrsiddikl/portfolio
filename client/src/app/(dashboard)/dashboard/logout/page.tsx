"use client";

import { useEffect } from "react";
import { signOut } from "next-auth/react";
import { logout } from "@/services";

export default function LogoutPage() {
  useEffect(() => {
    const handleAutoLogout = async () => {
      try {
        await logout();
        await signOut({ callbackUrl: "/", redirect: true });
      } catch (error) {
        console.error("Auto logout failed:", error);
      }
    };

    handleAutoLogout();
  }, []);

  return;
}
