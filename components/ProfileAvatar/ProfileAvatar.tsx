'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import styles from './ProfileAvatar.module.css';

import { updateAvatar } from '@/lib/api/clientApi';
import { toast, Toaster } from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface ProfileAvatarProps {
  avatar: string;
  name: string;
  email: string;
}

export default function ProfileAvatar({
  avatar,
  name,
  email,
}: ProfileAvatarProps) {
  const [avatarPreview, setAvatarPreview] = useState(avatar);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: File) => {
      const res = await updateAvatar(data);
      setAvatarPreview(res.url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('Аватар успішно оновлено');
    },
    onError: () => {
      toast.error('Сталась помилка при завантаженні аватара');
    },
  });

  async function handleAvatarChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (avatarPreview) {
      URL.revokeObjectURL(avatarPreview);
    }
    setAvatarPreview(URL.createObjectURL(file));
    createMutation.mutate(file);
  }

  return (
    <div className={styles.avatarSection}>
      <Toaster position="top-right" />
      <div
        className={styles.avatarCircle}
        onClick={() => fileInputRef.current?.click()}
      >
        <Image
          src={avatarPreview}
          alt="Аватар"
          width={140}
          height={140}
          className={styles.image}
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept="image/*"
        onChange={handleAvatarChange}
      />
      <div className={styles.btnBox}>
        <p className={styles.name}>{name}</p>
        <p className={styles.email}>{email}</p>
        <button
          type="button"
          className={styles.uploadBtn}
          onClick={() => fileInputRef.current?.click()}
        >
          Завантажити нове фото
        </button>
      </div>
    </div>
  );
}
