import styles from './BabyTodayCard.module.css';
import Image from 'next/image';
import { getBabyState } from '../../lib/api/serverApi';

export default async function BabyTodayCard() {
  const data = await getBabyState();

  return (
    <section className={styles.babycard}>
      <p className={styles.titleBaby}>Малюк сьогодні</p>

      <div className={styles.babycardlistitem}>
        <Image
          src={data.image}
          alt="Зображення малюка"
          width={257}
          height={194}
          className={styles.babyImage}
        />

        <ul className={styles.babycardlist}>
          <li>Розмір: {data.babySize}</li>
          <li>Вага: {data.babyWeight}</li>
          <li>Активність: {data.babyActivity}</li>
        </ul>
      </div>

      <div className={styles.bodyAdvice}>
        <p>{data.babyDevelopment}</p>
      </div>
    </section>
  );
}
