import styles from './BabyTodayCard.module.css';
// import Image from 'next/image';
// import { getBabyState } from '../../lib/api/clientApi';

export default function BabyTodayCard() {
  // const data = await getBabyState();
  const data = {
    babyDevelopment: 'sdfsdyfgyg',
  };
  const size = 15;
  const weight = 18;
  const activity = 'yguyiiuyg';

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
            <p className={styles.babycard__datalabel}>
              Розмір: <span>{size}</span>
            </p>
          </li>
          <li>
            <p className={styles.babycard__datalabel}>
              Вага: <span>{weight}</span>
            </p>
          </li>
          <li>
            <p className={styles.babycard__datalabel}>
              Активність: <span>{activity}</span>
            </p>
          </li>
        </ul>
      </div>

      <div className={styles.bodyAdvice}>
        <p>{data.babyDevelopment}</p>
      </div>
    </section>
  );
}
