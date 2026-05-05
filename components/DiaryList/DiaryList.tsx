'use client';

import { useState } from 'react';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import AddDiaryEntryModal from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';
import { Note } from '@/types/types';
import styles from './DiaryList.module.css';

interface DiaryListProps {
  entries: Note[];
  onEntrySelect?: (entry: Note) => void;
  selectedEntryId?: string;
}

export default function DiaryList({
  entries,
  onEntrySelect,
  selectedEntryId,
}: DiaryListProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.listHeader}>
        <h2 className={styles.listTitle}>Ваші записи</h2>
        <button
          className={styles.newEntryButton}
          onClick={() => setIsModalOpen(true)}
          aria-label="Додати новий запис"
        >
          Новий запис
          <span className={styles.plusIcon} aria-hidden="true">
            ⊕
          </span>
        </button>
      </div>

      <ul className={styles.list} role="list">
        {entries.map(entry => (
          <li key={entry._id} className={styles.listItem}>
            <DiaryEntryCard
              entry={entry}
              isSelected={selectedEntryId === entry._id}
              onSelect={onEntrySelect}
            />
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <AddDiaryEntryModal onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
