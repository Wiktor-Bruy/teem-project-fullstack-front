import Link from 'next/link';
import styles from './AuthBar.module.css';

export default function AuthBar() {
  return (
    <div className={styles.wrapper}>
      <Link href="/register" className={styles.primary}>
        Зареєструватись
      </Link>
      <Link href="/login" className={styles.secondary}>
        Увійти
      </Link>
    </div>
  );
}
