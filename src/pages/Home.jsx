import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const ADVANTAGES = [
  {
    title: '32,000 +',
    description: 'Experienced tutors',
  },
  {
    title: '300,000 +',
    description: '5-star tutor reviews',
  },
  {
    title: '120 +',
    description: 'Subjects taught',
  },
  {
    title: '200 +',
    description: 'Tutor nationalities',
  },
];

const Home = () => (
  <section className={styles.hero}>
    <div className={styles.top}>
      <div className={styles.textBlock}>
        <h1 className={styles.title}>
          Unlock your potential with the best <span className={styles.highlight}>language</span>{' '}
          tutors
        </h1>
        <p className={styles.subtitle}>
          Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your
          language proficiency to new heights by connecting with highly qualified and
          experienced tutors.
        </p>
        <Link to="/teachers" className={styles.cta}>
          Get started
        </Link>
      </div>

      <div className={styles.imageBlock}>
        <img src="/img/girl.svg" alt="Happy Girl" className={styles.image} />
      </div>
    </div>

    <ul className={styles.advantages}>
      {ADVANTAGES.map((advantage) => (
        <li key={advantage.description} className={styles.advantageItem}>
          <span className={styles.advantageNumber}>
         {advantage.title.replace(' +', '')}
         <span className={styles.plus}>+</span>
         </span>
          <span className={styles.advantageLabel}>{advantage.description}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default Home;