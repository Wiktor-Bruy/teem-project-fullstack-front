import { useEffect } from "react";
import styles from "./Modal.module.css";

export default function AddDiaryEntryModal({ isOpen, onClose, children }: any) {
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
        <button className={styles.close} onClick={onClose}>
         <img src="/public/close.svg" alt="close" />
        </button>
        {children}
      </div>
    </div>
  );
}