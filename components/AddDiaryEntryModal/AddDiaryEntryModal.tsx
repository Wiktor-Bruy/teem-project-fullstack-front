'use client';

import Modal from '../Modal/Modal';
import styles from './AddDiaryEntryModal.module.css';
import AddDiaryEntryForm from '../AddDiaryEntryForm/AddDiaryEntryForm';
import type { InitialData } from '@/components/AddDiaryEntryForm/AddDiaryEntryForm';


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
      <div className={styles.content}>
        <AddDiaryEntryForm
          onSuccess={onClose}
          initialData={initialData}
        />
      </div>
    </Modal>
  );
}

