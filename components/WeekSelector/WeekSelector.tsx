
'use client';

import { getBabyState } from '@/lib/api/clientApi';
import css from './WeekSelector.module.css';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function WeekSelector() {
  const router = useRouter();
  const allWeeks = Array.from({ length: 39 }, (_, i) => i + 1);

  const { data, isLoading } = useQuery({
    queryKey: ['babyStateWeek'],
    queryFn: getBabyState,
  });

  const currentWeek = data?.week || 1;

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className={css.sectionWeeks}>
      <div className={css.weeksScrollContainer}>
        {allWeeks.map((babyStateWeek) => {
          const isActive = babyStateWeek <= currentWeek;
          const isCurrent = babyStateWeek === currentWeek;

          return (
            <button
              key={babyStateWeek}
              disabled={!isActive}
              onClick={() => {
                if (!isActive) return;
                router.push(`/journey/${babyStateWeek}`);
              }}
              className={`${css.buttonWeek} ${isCurrent ? css.buttonWeekActive : ''} ${
                !isActive ? css.buttonWeekDisabled : ''
              }`}
            >
              <p className={css.weekNumber}>{babyStateWeek}</p>
              <p className={css.weekName}>Тиждень</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}