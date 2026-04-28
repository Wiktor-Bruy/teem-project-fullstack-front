'use client';

import { ChangeEvent, useState } from 'react';
import styles from './ProfileAvatar.module.css';
import { User } from '@/types/types';
import { updateAvatar } from '@/lib/api/clientApi';

interface ProfileAvatarProps {
  user?: User;
}

export default function ProfileAvatar({ user }: ProfileAvatarProps) {
  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar);
  const [isLoading, setIsLoading] = useState(false);

  const handleAvatarUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const data = await updateAvatar(file);
      setAvatar(data.avatar);
    } catch (error) {
      console.error('Failed to upload avatar:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div className={styles.container}>Завантаження...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.avatarWrapper}>
        {avatar ? (
          <img src={avatar} alt={user.name} className={styles.avatar} />
        ) : (
          <div className={styles.avatarPlaceholder}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <h2 className={styles.name}>{user.name}</h2>
      <p className={styles.email}>{user.email}</p>

      <label htmlFor="avatar-input" className={styles.uploadButton}>
        {isLoading ? 'Завантаження...' : 'Завантажити нове фото'}
      </label>
      <input
        id="avatar-input"
        type="file"
        accept="image/*"
        onChange={handleAvatarUpload}
        disabled={isLoading}
        className={styles.hiddenInput}
      />
    </div>
  );
}
