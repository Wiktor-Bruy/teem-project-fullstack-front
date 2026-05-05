import React from 'react';
import styles from './BabyTodayCard.module.css';
import Image from 'next/image';

interface BabyTodayCardProps {
  size: string;
  weight: string;
  activity: string;
  imageUrl: string;
  bodyAdvice: string;
}

export default function BabyTodayCard({ size, weight, activity, imageUrl, bodyAdvice }: BabyTodayCardProps) {
  return (
    <section className={styles.babycard}>
      <p className={styles.titleBaby}>Малюк сьогодні</p>
      <div id="BabyState" className={styles.babycard__listitem}>
         {/* <Image
        src={imageUrl}
        alt="Зображення малюка"
        width={257}
        height={194}
        className={styles.babyImage}
      /> */}
        <ul className={styles.babycard__list}>
          <li>
            <p className={styles.babycard__datalabel}>Розмір: <span>{size}</span></p>
          </li>
          <li>
            <p className={styles.babycard__datalabel}>Вага: <span>{weight}</span></p>
          </li>
          <li>
            <p className={styles.babycard__datalabel}>Активність: <span>{activity}</span></p>
          </li>
        </ul>
      </div>
      <div className={styles.bodyAdvice}>
        <p className={styles.babycard__advice}>{bodyAdvice}</p>
      </div>
    </section>
  );
}
