'use client';
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Loading from '@/app/loading';


interface AuthStoreProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthStoreProps) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearIsAuthenticated)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['me'],
    queryFn: getMe,
    retry: false
  });

   if (data) {
    setUser(data);
   }

  if (isError) {
    clearUser();
  }

  if (isLoading) {
    return children;
  }

  return children;
}

