import Modal from '../Modal/Modal';

interface ConfirmationModalProps {
  title: string;
  cancelButtonText: string;
  confirmButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({
  title,
  cancelButtonText,
  confirmButtonText,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <Modal onClose={onCancel}>
      <div className="confirm">
        <button className="confirm-close" onClick={onCancel}>
          <svg width="24" height="24">
            <use href="../../public/icons.svg#close" />
          </svg>
        </button>
        <h2 className="confirm-title">{title}</h2>
        <div className="confirm-actions">
          <button
            className="confirm-btn confirm__btn--cancel"
            onClick={onCancel}
          >
            {cancelButtonText}
          </button>

          <button
            className="confirm-btn confirm__btn--confirm"
            onClick={onConfirm}
          >
            {confirmButtonText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
