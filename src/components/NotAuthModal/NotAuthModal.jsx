import Modal from '../Modal/Modal';
import styles from './NotAuthModal.module.css';

const NotAuthModal = ({ isOpen, onClose, onLoginClick }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className={styles.content}>
      <h2 className={styles.title}>Only for authorized users</h2>
      <p className={styles.subtitle}>
        Please log in or create an account to add teachers to your favorites list.
      </p>
      <button
        type="button"
        className={styles.loginButton}
        onClick={() => {
          onClose();
          onLoginClick();
        }}
      >
        Log In
      </button>
    </div>
  </Modal>
);

export default NotAuthModal;
