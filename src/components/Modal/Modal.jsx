import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close window"
        >
          <svg width="32" height="32">
            <use href="/sprite.svg#icon-x" />
          </svg>
        </button>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default Modal;
