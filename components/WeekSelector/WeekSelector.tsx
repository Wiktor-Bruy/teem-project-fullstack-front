'use client';

import css from './WeekSelector.module.css';
import { useRouter } from 'next/navigation';

interface Props {
  currentWeek: number;
  onWeekChange: (week: number) => void;
}

export default function WeekSelector({ currentWeek, onWeekChange }: Props) {
  const router = useRouter();
  const allWeeks = Array.from({ length: 39 }, (_, i) => i + 1);

  return (
    <section className={css.sectionWeeks}>
      <div className={css.weeksScrollContainer}>
        {allWeeks.map((week) => {
          const isActive = week <= currentWeek;
          const isCurrent = week === currentWeek;

          return (
            <button
              key={week}
              disabled={!isActive}
              onClick={() => {
                if (!isActive) return;
                onWeekChange(week);
                router.push(`/journey/${week}`);
              }}
              className={`${css.buttonWeek} ${isCurrent ? css.buttonWeekActive : ''} ${
                !isActive ? css.buttonWeekDisabled : ''
              }`}
            >
              <p className={css.weekNumber}>{week}</p>
              <p className={css.weekName}>Тиждень</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}