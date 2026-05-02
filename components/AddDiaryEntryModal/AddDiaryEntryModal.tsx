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
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", esc);
    return () => document.removeEventListener("keydown", esc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className={styles.header}>
          <h2>
            {initialData ? "Редагувати запис" : "Новий запис"}
          </h2>

          <button className={styles.close} onClick={onClose}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                d="M6 6L18 18M6 18L18 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* form */}
        <AddDiaryEntryForm
          initialData={initialData}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}