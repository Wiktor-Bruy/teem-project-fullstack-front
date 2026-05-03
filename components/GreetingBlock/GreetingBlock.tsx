'use client';

import styles from './GreetingBlock.module.css';
import { useEffect, useState } from 'react';

type Props = {
  name?: string;
};

function getGreetingByHour(hour: number) {
  if (hour >= 6 && hour < 12) return 'Доброго ранку';
  if (hour >= 12 && hour < 18) return 'Доброго дня';
  if (hour >= 18 && hour < 24) return 'Доброго вечора';
  return 'Доброї ночі';
}

export default function GreetingBlock({ name = 'гість' }: Props) {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(getGreetingByHour(hour));
  }, []);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>
        {greeting}, {name}!
      </h1>
    </div>
  );
}
