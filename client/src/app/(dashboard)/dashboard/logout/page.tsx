"use client";
import { signOut } from "next-auth/react";

export default function Logout() {
  const handleLogout = () => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return <button onClick={handleLogout}>Logout</button>;
}
