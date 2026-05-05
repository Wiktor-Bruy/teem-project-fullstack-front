'use client';

import Modal from '../Modal/Modal';

import { useEffect } from 'react';
import styles from './AddDiaryEntryModal.module.css';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData?: any;
};

export default function AddDiaryEntryModal({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
    <Modal>
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
