'use client';
import { getMe, refreshSession } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';


interface AuthStoreProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthStoreProps) {
  const setUser = useAuthStore(state => state.setUser);
  const clearUser = useAuthStore(state => state.clearIsAuthenticated);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

useEffect(() => {
  const autorisation = async () => {
    try {
      await refreshSession();
      const user = await getMe();

      if (user) {
        setUser(user);
      } else {
        clearUser();
      }
    } catch {
      clearUser();
    } finally {
      setIsAuthLoading(false);
    }
  };

  autorisation();
}, []);

if (isAuthLoading) return null;

  return children;
}
