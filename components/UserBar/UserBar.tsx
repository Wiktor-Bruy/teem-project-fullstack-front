'use client';

import css from './UserBar.module.css';

import Image from 'next/image';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import type { User } from '@/types/types';
import { logout } from '@/lib/api/clientApi';

interface UserBarProps {
  user: User;
}

export default function UserBar({ user }: UserBarProps) {
  const router = useRouter();

  async function handleLogout() {
    try {
      await logout();
      router.push('/login');
    } catch {
      toast.error('Сталась помилка при виході');
    }
  }

  return (
    <div className={css.cont}>
      <Toaster />
      <div className={css.imageBox}>
        <Image className={css.image} src={user.avatar} alt="avatar" fill />
      </div>
      <div className={css.nameBox}>
        <p className={css.name}>{user.name}</p>
        <p className={css.email}>{user.email}</p>
      </div>
      <button className={css.logout} type="button" onClick={handleLogout}>
        <svg width={18} height={18}>
          <use href="/icons.svg#logout"></use>
        </svg>
      </button>
    </div>
  );
}
