import styles from './BabyTodayCard.module.css';
import Image from 'next/image';
import { getBabyState } from '../../lib/api/serverApi';

export default async function BabyTodayCard() {
  const data = await getBabyState();

  return (
    <section className={styles.babycard}>
      <p className={styles.titleBaby}>Малюк сьогодні</p>

      <div className={styles.babycard__listitem}>
        <Image
          src={data.imageUrl}
          alt="Зображення малюка"
          width={257}
          height={194}
          className={styles.babyImage}
        />

        <ul className={styles.babycard__list}>
          <li>Розмір: {data.size}</li>
          <li>Вага: {data.weight}</li>
          <li>Активність: {data.activity}</li>
        </ul>
      </div>

      <div className={styles.bodyAdvice}>
        <p>{data.bodyAdvice}</p>
      </div>
    </section>
  );
}