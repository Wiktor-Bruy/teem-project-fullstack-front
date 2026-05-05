import Link from 'next/link';
import styles from './AuthBar.module.css';

export default function AuthBar() {
  return (
    <div className={styles.wrapper}>
      <a href="/register" className={styles.primary}>
        Зареєструватись
      </a>
      <a href="/login" className={styles.secondary}>
        Увійти
      </a>
    </div>
  );
}
