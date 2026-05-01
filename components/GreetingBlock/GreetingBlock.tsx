'use client';

import styles from './GreetingBlock.module.css';

type Props = {
  name?: string;
};

export default function GreetingBlock({ name = 'Ганно' }: Props) {
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 6 && hour < 12) return 'Доброго ранку';
    if (hour >= 12 && hour < 18) return 'Доброго дня';
    if (hour >= 18 && hour < 24) return 'Доброго вечора';
    return 'Доброї ночі';
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        {getGreeting()}, {name}!
      </h1>
    </div>
  );
}
