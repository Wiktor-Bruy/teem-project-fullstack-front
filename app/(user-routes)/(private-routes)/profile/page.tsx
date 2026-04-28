'use client';

import { useEffect, useState } from 'react';
import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import { User } from '@/types/types';
import { getMe } from '@/lib/api/clientApi';
import styles from './profile.module.css';

export default function Profile() {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <div className={styles.profileContainer}>
      <ProfileAvatar user={user} />
      <ProfileEditForm user={user} onUserUpdate={handleUserUpdate} />
    </div>
  );
}
