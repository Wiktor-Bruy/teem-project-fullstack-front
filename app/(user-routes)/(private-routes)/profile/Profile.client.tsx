'use client';

import ProfileAvatar from '@/components/ProfileAvatar/ProfileAvatar';
import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';
import { getMe } from '@/lib/api/clientApi';
import styles from './profile.module.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

export default function ProfileClient() {
  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: () => getMe(),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    throwOnError: true,
  });

  return (
    <div className={styles.profileContainer}>
      {data ? (
        <ProfileAvatar
          avatar={data?.avatar}
          name={data.name}
          email={data.email}
        />
      ) : (
        <p>Сталася помилка при завантаженні даних користувача...</p>
      )}

      {data ? (
        <ProfileEditForm user={data} />
      ) : (
        <p>Сталася помилка при завантаженні даних користувача...</p>
      )}
    </div>
  );
}
