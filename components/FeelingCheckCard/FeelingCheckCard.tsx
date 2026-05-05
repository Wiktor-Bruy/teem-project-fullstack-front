import React from 'react';
import styles from './FeelingCheckCard.module.css';

interface FeelingCardProps {
  recommendation: string;
  buttonText: string;
}

export default function FeelingCard({
  recommendation,
  buttonText,
}: FeelingCardProps) {
  return (
    <section className={styles.card}>
      <h2 className={styles.title}> Як ви себе почуваєте?</h2>

      <p className={styles.subtitle}>Рекомендація на сьогодні:</p>

      <p className={styles.text}>{recommendation}</p>

      <button className={styles.button}> Зробити запис у щоденник
        {buttonText}
      </button>
    </section>
  );
}