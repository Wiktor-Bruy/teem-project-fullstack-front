'use client';

import Modal from '../Modal/Modal';
import type { Note } from '@/types/types';

import { useEffect } from 'react';
import styles from './AddDiaryEntryModal.module.css';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';

type Props = {
  onClose: () => void;
  initialData?: Note | null;
};

export default function AddDiaryEntryModal({ onClose, initialData }: Props) {
  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
    <Modal onClose={onClose}>
      <h2>{initialData ? 'Редагувати запис' : 'Новий запис'}</h2>

      <div className={styles.content}>
        <AddDiaryEntryForm
          initialData={initialData}
          onSuccess={handleSuccess}
        />
      </div>
    </Modal>
  );
}
