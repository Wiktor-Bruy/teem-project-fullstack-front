'use client';

import Modal from '../Modal/Modal';
<<<<<<< alina-zolo/myDay-page
=======
import type { Note } from '@/types/types';

import { useEffect } from 'react';
>>>>>>> main
import styles from './AddDiaryEntryModal.module.css';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';
import type { InitialData } from '@/components/AddDiaryEntryForm/AddDiaryEntryForm';

<<<<<<< alina-zolo/myDay-page

interface AddDiaryEntryModalProps {
  onClose: () => void;
  initialData?: InitialData;
}

export default function AddDiaryEntryModal({ onClose, initialData }: AddDiaryEntryModalProps) {

  return (
    <Modal onClose={onClose}>
      <h2 className={styles.header}>
          {initialData ? 'Редагувати запис' : 'Новий запис'}
      </h2>
=======
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

>>>>>>> main
      <div className={styles.content}>
        <AddDiaryEntryForm
          onSuccess={onClose}
          initialData={initialData}
        />
      </div>
    </Modal>
  );
}

