"use client";
import { IUser } from "@/services";
import { apiRequest } from "@/services/apiClient";
import { createContext, useContext, useEffect, useState } from "react";

// Context value type
interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

// Default context
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to load logged-in user
  const getLoggedInUser = async () => {
    try {
      const res = await apiRequest<IUser>("/user/me", {
        method: "GET",
        credentials: "include",
      });
      if (res?.success && res?.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Load user on mount
  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, refreshUser: getLoggedInUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}
