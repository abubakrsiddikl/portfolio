"use client";

import { useEffect } from "react";
import { logout } from "@/services";

export default function LogoutPage() {
  useEffect(() => {
    const handleAutoLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error("Auto logout failed:", error);
      }
    };

    handleAutoLogout();
  }, []);

  return;
}
