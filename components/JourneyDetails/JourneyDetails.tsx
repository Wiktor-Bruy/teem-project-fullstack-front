
'use client';

import { getBabyState, getMomState, getTasks } from '@/lib/api/clientApi';
import type { BabyState, Emotion, MomState, TaskResponse } from '@/types/types';
import css from './JourneyDetails.module.css';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useState } from 'react';

export default function JourneyDetails() {
  const [activeTab, setActiveTab] = useState<'baby' | 'mom'>('baby');

  const { isLoading: isBabyLoading, data: babyData, isError: isBabyError } = useQuery<BabyState>({
    queryKey: ['babyState'],
    queryFn: getBabyState,
  });

  const { isLoading: isMomLoading, data: momData, isError: isMomError } = useQuery<MomState>({
    queryKey: ['momState'],
    queryFn: getMomState,
  });

  const { isLoading: isTasksLoading, data: tasksData, isError: isTasksError } =
    useQuery<TaskResponse[]>({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const isLoading = isMomLoading || isBabyLoading || isTasksLoading;
  const isError = isMomError || isBabyError || isTasksError;

  if (isLoading) return <div className={css.loader}>Завантаження...</div>;
  if (isError || !babyData) return <div className={css.error}>Помилка...</div>;

  return (
    <>
      <section className={css.sectionWeeks}>
        <div className={css.weeksScrollConteiner}>
          <button className={css.buttonWeek}>
            <p className={css.weekNumber}>{babyData.week}</p>
            <p className={css.weekName}>Тиждень</p>
          </button>
        </div>
      </section>

      <section className={css.journeyInfo}>
        <div className={css.tab}>
          <div className={css.tabsNav}>
            <button
              className={`${css.babyContent} ${activeTab === 'baby' ? css.activeTab : ''}`}
              onClick={() => setActiveTab('baby')}
            >
              <p className={css.babyButton}>Розвиток малюка</p>
            </button>

            <button
              className={`${css.motherBodyContent} ${activeTab === 'mom' ? css.activeTab : ''}`}
              onClick={() => setActiveTab('mom')}
            >
              <p className={css.motherBodyButton}>Тіло мами</p>
            </button>
          </div>
        </div>

        {activeTab === 'baby' && (
          <div className={css.babyInformation}>
            {babyData.image ? (
              <Image
                src={babyData.image}
                alt="baby size picture"
                className={css.babyPhotoSize}
                width={200}
                height={200}
              />
            ) : null}
            {babyData.analogy ? (
              <p className={css.sizePhotoDescription}>{babyData.analogy}</p>
            ) : null}
            {babyData.babyDevelopment ? (
              <p className={css.babySizeInformation}>{babyData.babyDevelopment}</p>
            ) : null}

            <div className={css.interestingWeekFact}>
              <div className={css.factHeader}>
                <svg className={css.iconStar} width="24" height="24">
                  <use href="/icons.svg#id-star"></use>
                </svg>
                <h3 className={css.titleFact}>Цікавий факт тижня</h3>
              </div>
              {babyData.interestingFact ? (
                <p className={css.descriptionFact}>{babyData.interestingFact}</p>
              ) : null}
            </div>
          </div>
        )}

        {activeTab === 'mom' && (
          <div className={css.motherInformation}>
            <div className={css.motherFeelingsTips}>
              <div className={css.motherFeelingCard}>
                <h3 className={css.cardTitel}>Як ви можете почуватись</h3>
                <div className={css.tags}>
                  {momData?.feelings?.states?.map((emotion: Emotion) => (
                    <span key={emotion._id} className={css.tag}>
                      {emotion.title}
                    </span>
                  ))}
                </div>
                <p className={css.feelingDescription}>{momData?.feelings?.sensationDescr}</p>
              </div>

              <div className={css.motherTipsCard}>
                <h3 className={css.tipsHeader}>Поради для вашого комфорту</h3>
                <ul className={css.tipItems}>
                  {momData?.comfortTips?.map((tip, index) => (
                    <li key={index} className={css.tipItem}>
                      <svg className={css.icon} width="24" height="24">
                        <use href={`/icons.svg#id-${index === 0 ? 'cutlery' : index === 1 ? 'dumbbell' : 'sofa'}`}></use>
                      </svg>
                      <div className={css.tipText}>
                        <p className={css.tipDescription}>{tip.tip}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={css.motherTasksCard}>
              <div className={css.tasksHeader}>
                <h3 className={css.cardTitle}>Важливі завдання</h3>
                <button className={css.taskBtn}>
                  <svg className={css.addTaskBtn} width="24" height="24">
                    <use href="/icons.svg#id-plus"></use>
                  </svg>
                </button>
              </div>
              <ul className={css.taskList}>
                {tasksData?.map((task) => (
                  <li key={task._id} className={css.taskItem}>
                    <span className={css.taskDate}>{task.date}</span>
                    <div className={css.taskContent}>
                      <input type="checkbox" id={`task-${task._id}`} checked={task.isDone} readOnly />
                      <label htmlFor={`task-${task._id}`}>{task.title}</label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </>
  );
}