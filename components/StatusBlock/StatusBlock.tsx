
import styles from "./StatusBlock.module.css";


interface StatusBlockProps {
  week: number;
  daysLeft: number;
}

const StatusBlock = ({ week, daysLeft }: StatusBlockProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <p className={styles.label}>Тиждень</p>
        <p className={styles.value}>{week}</p>
      </div>

      <div className={styles.card}>
        <p className={styles.label}>Днів до зустрічі</p>
        <p className={styles.value}>~{daysLeft}</p>
      </div>
    </div>
  );
};

export default StatusBlock;