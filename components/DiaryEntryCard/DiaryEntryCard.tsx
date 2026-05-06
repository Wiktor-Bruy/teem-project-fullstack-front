'use client';

import { useRouter } from 'next/navigation';
import { Note } from '@/types/types';
import styles from './DiaryEntryCard.module.css';

interface DiaryEntryCardProps {
  entry: Note;
  isSelected?: boolean;
  onSelect?: (entry: Note) => void;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date
    .toLocaleDateString('uk-UA', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    .replace(' р.', '');
}

export default function DiaryEntryCard({
  entry,
  isSelected = false,
  onSelect,
}: DiaryEntryCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (window.innerWidth < 1440) {
      router.push(`/diary/${entry._id}`);
    } else {
      onSelect?.(entry);
    }
  };

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handleClick()}
      aria-label={`Запис: ${entry.title}`}
    >
      <div className={styles.cardHeader}>
        <h3 className={styles.title}>{entry.title}</h3>
        <span className={styles.date}>{formatDate(entry.createdAt)}</span>
      </div>

      {entry.emotions.length > 0 && (
        <div className={styles.emotions}>
          {entry.emotions.map(emotion => (
            <span key={emotion._id} className={styles.emotionTag}>
              {emotion.title}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
