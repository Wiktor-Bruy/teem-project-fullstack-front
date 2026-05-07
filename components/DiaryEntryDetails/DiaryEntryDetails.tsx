import styles from './DiaryEntryDetails.module.css';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

import type { Note } from '@/types/types';
import { deleteNote } from '@/lib/api/clientApi';

interface DiaryEntryDetailsProps {
  entry?: Note | null;
  onEdit: () => void;
}

export default function DiaryEntryDetails({
  entry,
  onEdit,
}: DiaryEntryDetailsProps) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteNote(id);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Запис щоденника видалено');
      if (window.innerWidth < 1440) {
        router.push('/diary');
      } else {
        router.refresh();
      }
    },
    onError: () => {
      toast.error('Сталась помилка при видаленні');
    },
  });

  if (!entry) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>У вас поки що неиає записів...</h2>
      </div>
    );
  } else {
    const date = new Date(entry.updatedAt ? entry.updatedAt : entry.createdAt);
    const day = date.getDay();
    const mounth = date.getMonth();
    const mounths = [
      'січня',
      'лютого',
      'березня',
      'квітня',
      'травня',
      'червня',
      'липня',
      'серпня',
      'вересня',
      'жовтня',
      'листопада',
      'грудня',
    ];
    const textMounth = mounths[mounth - 1];
    const year = date.getFullYear();
    return (
      <div className={styles.container}>
        <Toaster position="top-right" />
        <div className={styles.topBox}>
          <div className={styles.titleBox}>
            <h2 className={styles.title}>{entry && entry.title}</h2>
            <button className={styles.editButton} onClick={onEdit}>
              <svg width={24} height={24}>
                <use href="/icons.svg#update"></use>
              </svg>
            </button>
          </div>
          <div className={styles.dateBox}>
            <p className={styles.date}>{`${day} ${textMounth} ${year}`}</p>
            <button
              className={styles.deleteButton}
              onClick={() => {
                if (entry._id) {
                  createMutation.mutate(entry._id);
                }
              }}
            >
              <svg width={24} height={24}>
                <use href="/icons.svg#delete"></use>
              </svg>
            </button>
          </div>
        </div>
        <p className={styles.text}>{entry && entry.description}</p>
        <div className={styles.emotions}>
          {entry &&
            entry.emotions.map(emotion => (
              <span key={emotion._id} className={styles.emotion}>
                {emotion.title}
              </span>
            ))}
        </div>
        <div className={styles.buttons}></div>
      </div>
    );
  }
}
