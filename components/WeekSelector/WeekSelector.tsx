'use client';

import css from './WeekSelector.module.css';
import { useRouter } from 'next/navigation';

interface Props {
  selectedWeek: number;
  currentWeek: number;
  onWeekChange: (week: number) => void;
}

export default function WeekSelector({ selectedWeek, currentWeek, onWeekChange }: Props) {
  const router = useRouter();
  const allWeeks = Array.from({ length: 39 }, (_, i) => i + 1);

  return (
    <section className={css.sectionWeeks}>
      <div className={css.weeksScrollContainer}>
        {allWeeks.map((week) => {
          const isActive = week <= currentWeek;
          const isSelected = week === selectedWeek;

          return (
            <button
              key={week}
              disabled={!isActive}
              type="button"
              tabIndex={!isActive ? -1 : 0}
              onClick={(e) => {
                if (!isActive) {
                  return;
                }
                onWeekChange(week);
                router.push(`/journey/${week}`);
              }}
              className={`${css.buttonWeek} ${isSelected ? css.buttonWeekActive : ''} ${
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