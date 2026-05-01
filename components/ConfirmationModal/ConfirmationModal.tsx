import Modal from '../Modal/Modal';
import css from './ConfirmationModal.module.css';
import clsx from 'clsx';

interface ConfirmationModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  title,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal onClose={onCancel}>
      <div className={css.confirm}>
        <h2 className={css.confirmTitle}>{title}</h2>
        <div className={css.confirmActions}>
          <button
            className={clsx(css.button, css.cancelButton)}
            onClick={onCancel}
          >
            Ні
          </button>
          <button
            className={clsx(css.button, css.confirmButton)}
            onClick={onConfirm}
          >
            Так
          </button>
        </div>
      </div>
    </Modal>
  );
}
