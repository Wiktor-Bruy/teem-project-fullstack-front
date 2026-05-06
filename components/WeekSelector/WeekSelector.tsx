'use client';

import css from './WeekSelector.module.css';
import { useEffect, useRef } from 'react';

interface Props {
  selectedWeek: number;
  currentWeek: number;
  onWeekChange: (week: number) => void;
}

export default function WeekSelector({ selectedWeek, currentWeek, onWeekChange }: Props) {
  const allWeeks = Array.from({ length: 40 }, (_, i) => i + 1);
  const currentWeekRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
    currentWeekRef.current?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  }, []);

  return (
    <section className={css.sectionWeeks}>
      <div className={css.weeksScrollContainer}>
        {allWeeks.map((week) => {
          const isActive = week <= currentWeek;
          const isSelected = week === selectedWeek;
          const isCurrent = week === currentWeek;
          const isHighlighted = isSelected || isCurrent;

          return (
            <button
              key={week}
              ref={(element) => {
    if (isCurrent) {
      currentWeekRef.current = element;
    }
  }}
              // ref={isCurrent ? currentWeekRef : null}
              disabled={!isActive}
              type="button"
              tabIndex={!isActive ? -1 : 0}
              aria-pressed={isSelected}
              onClick={() => {
                if (!isActive) {
                  return;
                }
                onWeekChange(week);
              }}
              className={`
              ${css.buttonWeek}
              ${isHighlighted ? css.buttonWeekActive : ''}
              ${!isActive ? css.buttonWeekDisabled : ''}
              `}
            >
              <span className={css.weekNumber}>{week}</span>
              <span className={css.weekName}>Тиждень</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
