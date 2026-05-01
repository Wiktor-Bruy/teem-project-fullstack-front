'use client';
import { useQuery } from "@tanstack/react-query";
import { getMe, refreshSession } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";


interface AuthStoreProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthStoreProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearIsAuthenticated)



  // const { data } = useQuery({
  //   queryKey: ['me'],
  //   queryFn: getMe,
  //   retry: false,
  // });


  // useEffect(() => {
  //   if (data) {
  //     setUser(data);
  //   } else {
  //     clearUser();
  //   }
  // }, [data, setUser, clearUser]);

  useEffect(() => {
    const initAuth = async () => {
      try {
        // 1. пробуємо рефреш
        await refreshSession();

        // 2. беремо юзера
        const user = await getMe();
        setUser(user);
      } catch (error) {
        clearUser();
      }
    };

    initAuth();
  }, [setUser, clearUser]);

  return children;
}

