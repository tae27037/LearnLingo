import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { registerSchema } from "../../utils/validationSchemas";
import { useAuth } from "../../context/AuthContext";
import styles from "./AuthModal.module.css";

const RegisterForm = ({ onSuccess }) => {
  const { register: registerUser } = useAuth();
  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(registerSchema) });

  const passwordValue = watch("password");
  const isEyeActive = showPassword && Boolean(passwordValue);

  const onSubmit = async (data) => {
    setFirebaseError("");
    try {
      await registerUser(data);
      onSuccess();
    } catch {
      setFirebaseError(
        "Couldn't register. Perhaps, such an email is already being vikorized",
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.subtitle}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>

      <label className={styles.field}>
        <input
          type="text"
          placeholder="Name"
          className={styles.input}
          {...register("name")}
        />
        <span className={styles.error}>{errors.name?.message}</span>
      </label>

      <label className={styles.field}>
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          {...register("email")}
        />
        <span className={styles.error}>{errors.email?.message}</span>
      </label>

      <label className={styles.field}>
        <div className={styles.passwordWrapper}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className={styles.input}
            {...register("password")}
          />

          <button
            type="button"
            className={`${styles.eyeButton} ${isEyeActive ? styles.eyeButtonActive : ""}`}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <svg width="20" height="20">
              <use href="/sprite.svg#icon-eye-off"></use>
            </svg>
          </button>
        </div>
        <span className={styles.error}>{errors.password?.message}</span>
      </label>

      {firebaseError && <span className={styles.error}>{firebaseError}</span>}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sign Up..." : "Sign Up"}
      </button>
    </form>
  );
};

export default RegisterForm;
