import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { loginSchema } from "../../utils/validationSchemas";
import { useAuth } from "../../context/AuthContext";
import styles from "./AuthModal.module.css";

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();
  const [firebaseError, setFirebaseError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const passwordValue = watch("password");
  const isEyeActive = showPassword && Boolean(passwordValue);

  const onSubmit = async (data) => {
    setFirebaseError("");
    try {
      await login(data);
      onSuccess();
    } catch {
      setFirebaseError("Invalid email or password");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.subtitle}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>

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
        {isSubmitting ? "Log In..." : "Log In"}
      </button>
    </form>
  );
};

export default LoginForm;
