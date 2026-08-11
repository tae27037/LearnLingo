import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthModal from "../AuthModal/AuthModal";
import styles from "./Header.module.css";

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [authModalMode, setAuthModalMode] = useState(null);

  const navLinkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <NavLink to="/" className={styles.logo}>
          <svg width="20" height="20">
            <use href="/sprite.svg#icon-ukraine"></use>
          </svg>
          LearnLingo
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/teachers" className={navLinkClass}>
            Teachers
          </NavLink>
          {isAuthenticated && (
            <NavLink to="/favorites" className={navLinkClass}>
              Favorites
            </NavLink>
          )}
        </nav>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <>
              <span className={styles.userName}>
                {user.displayName || user.email}
              </span>
              <button
                type="button"
                className={styles.textButton}
                onClick={logout}
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                className={styles.textButton}
                onClick={() => setAuthModalMode("login")}
              >
                <svg width="20" height="20" stroke="currentColor" fill="none">
                  <use href="/sprite.svg#icon-log-in-01"></use>
                </svg>
                Log In
              </button>
              <button
                type="button"
                className={styles.registerButton}
                onClick={() => setAuthModalMode("register")}
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={Boolean(authModalMode)}
        onClose={() => setAuthModalMode(null)}
        initialMode={authModalMode || "login"}
      />
    </header>
  );
};

export default Header;
