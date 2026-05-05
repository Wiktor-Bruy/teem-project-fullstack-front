'use client';
import { getMe, refreshSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect } from 'react';

interface AuthStoreProps {
  children: React.ReactNode;
}
interface ResponseRefresh {
  success: boolean;
}

export default function AuthProvider({ children }: AuthStoreProps) {
  const setUser = useAuthStore(state => state.setUser);
  const clearUser = useAuthStore(state => state.clearIsAuthenticated);

  useEffect(() => {
    const autorisation = async () => {
      const isLogin: ResponseRefresh = await refreshSession();
      if (isLogin.success) {
        const user = await getMe();
        if (user) {
          setUser(user);
        } else {
          clearUser();
        }
      }
    };

    autorisation();
  }, [setUser, clearUser]);

  return children;
}
