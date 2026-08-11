import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthModal = ({ isOpen, onClose, initialMode = "login" }) => {
  const [mode, setMode] = useState(initialMode);

  useEffect(() => {
    if (isOpen) setMode(initialMode);
  }, [isOpen, initialMode]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {mode === "login" ? (
        <LoginForm onSuccess={onClose} />
      ) : (
        <RegisterForm onSuccess={onClose} />
      )}
    </Modal>
  );
};

export default AuthModal;
