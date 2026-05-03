"use client";

import { useEffect } from "react";
import styles from "./AddDiaryEntryModal.module.css";
import AddDiaryEntryForm from "../AddDiaryEntryForm/AddDiaryEntryForm";

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
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleSuccess = () => {
    onSuccess();
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {}
        <div className={styles.header}>
          <h2>{initialData ? "Редагувати запис" : "Новий запис"}</h2>

          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>

        {}
        <div className={styles.content}>
          <AddDiaryEntryForm
            initialData={initialData}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}