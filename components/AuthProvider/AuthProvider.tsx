'use client';
import { getMe, refreshSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";
import { usePathname } from "next/navigation";



interface AuthStoreProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthStoreProps) {
const setUser = useAuthStore((state) => state.setUser);
const clearUser = useAuthStore((state) => state.clearIsAuthenticated)
const pathname = usePathname();

useEffect(() => {
  if (pathname ===  '/' || '/login' || pathname === '/register') return;

  const initAuth = async () => {
    try {
      await refreshSession();
    } catch {
      clearUser();
      return;
    }

    try {
      const user = await getMe();

      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
    } catch {
      clearUser();
    }
  };

  initAuth();
}, [pathname, setUser, clearUser]);


  return children;
}

