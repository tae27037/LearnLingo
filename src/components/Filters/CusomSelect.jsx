import { useState, useRef, useEffect } from "react";
import styles from "./Filters.module.css";

const CustomSelect = ({ label, options, value, placeholder, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(
    (opt) => String(opt.value) === String(value),
  );
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={styles.field} ref={ref}>
      <span className={styles.label}>{label}</span>

      <button
        type="button"
        className={styles.select}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {displayText}
        <svg
  className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
  width="16"
  height="16"
>
  <use href="/sprite.svg#icon-chevron-down"></use>
</svg>
      </button>

      {isOpen && (
        <ul className={styles.dropdown}>
          <li
            className={`${styles.option} ${value === "" ? styles.optionActive : ""}`}
            onClick={() => {
              onChange("");
              setIsOpen(false);
            }}
          >
            {placeholder}
          </li>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${styles.option} ${String(option.value) === String(value) ? styles.optionActive : ""}`}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
