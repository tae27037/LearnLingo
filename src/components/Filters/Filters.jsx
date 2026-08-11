import CustomSelect from "./CusomSelect.jsx";
import styles from "./Filters.module.css";

const LANGUAGES = [
  "English",
  "French",
  "German",
  "Italian",
  "Korean",
  "Mandarin Chinese",
  "Polish",
  "Spanish",
  "Vietnamese",
];
const LEVELS = [
  "A1 Beginner",
  "A2 Elementary",
  "B1 Intermediate",
  "B2 Upper-Intermediate",
  "C1 Advanced",
  "C2 Proficient",
];
const PRICES = [10, 20, 30, 40, 50];

const Filters = ({ filters, onChange }) => {
  const handleChange = (field) => (newValue) => {
    onChange({ ...filters, [field]: newValue });
  };

  return (
    <div className={styles.filters}>
      <CustomSelect
        label="Languages"
        placeholder="All languages"
        value={filters.language}
        onChange={handleChange("language")}
        options={LANGUAGES.map((lang) => ({ value: lang, label: lang }))}
      />

      <CustomSelect
        label="Level of knowledge"
        placeholder="All levels"
        value={filters.level}
        onChange={handleChange("level")}
        options={LEVELS.map((level) => ({ value: level, label: level }))}
      />

      <CustomSelect
        label="Price"
        placeholder="All prices"
        value={filters.price}
        onChange={handleChange("price")}
        options={PRICES.map((price) => ({ value: price, label: `${price}$` }))}
      />
    </div>
  );
};

export default Filters;
