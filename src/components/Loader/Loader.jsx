import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.wrapper} role="status" aria-label="Loading">
    <span className={styles.spinner} />
  </div>
);

export default Loader;
