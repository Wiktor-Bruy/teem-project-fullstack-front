'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Loader from '@/components/Loader/Loader';

interface PublicLayoutProps {
  children: React.ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, [router]);

  return <>{loading ? <Loader /> : children}</>;
}
