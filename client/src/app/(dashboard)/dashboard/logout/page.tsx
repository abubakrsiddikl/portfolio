"use client";

import { useEffect } from "react";
import { logout } from "@/services";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();
  useEffect(() => {
    const handleAutoLogout = async () => {
      try {
        const res = await logout();
        if (res.success) {
          localStorage.clear();
          router.push("/");
        }
      } catch (error) {
        console.error("Auto logout failed:", error);
      }
    };

    handleAutoLogout();
  }, [router]);

  return;
}
