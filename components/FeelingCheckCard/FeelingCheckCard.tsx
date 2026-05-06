import styles from './FeelingCheckCard.module.css';

interface FeelingCardProps {
  recommendation: string;
  onAction: () => void;
}

export default function FeelingCard({
  recommendation,
  onAction,
}: FeelingCardProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}> Як ви себе почуваєте?</h2>
      <p className={styles.subtitle}>Рекомендація на сьогодні:</p>
      <p className={styles.text}>{recommendation}</p>
      <button
        className={styles.button}
        type="button"
        onClick={onAction}>
        Зробити запис у щоденник
      </button>
    </section>
  );
}
