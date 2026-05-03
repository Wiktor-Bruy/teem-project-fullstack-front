
'use client';

import css from './JourneyDetails.module.css';
import Image from 'next/image';
import { useState } from 'react';
import TasksReminderCard from '@/components/TasksReminderCard/TasksReminderCard'; 
import type { BabyState, MomState, Emotion } from '@/types/types';

interface Props {
  babyData: BabyState;
  momData: MomState | undefined;
}

export default function JourneyDetails( { babyData, momData }: Props){
  const [activeTab, setActiveTab] = useState<'baby' | 'mom'>('baby');

  return (
    <>
      <section className={css.sectionWeeks}>
        <div className={css.weeksScrollConteiner}>
          <button className={css.buttonWeek}>
            <p className={css.weekNumber}>{babyData.weekNumber}</p>
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
                <h3 className={css.cardTitle}>Як ви можете почуватись</h3>
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

                  <li className={css.tipItem}>
                    <svg className={css.icon} width="24" height="24">
                      <use href="/icons.svg#id-cutlery"></use>
                    </svg>
                    <div className={css.tipText}>
                      <p className={css.tipTitle}>Харчування</p>
                      <p className={css.tipDescription}>{momData?.comfortTips?.[0]?.tip}</p>
                    </div>
                  </li>

                  <li className={css.tipItem}>
                    <svg className={css.icon} width="24" height="24">
                      <use href="/icons.svg#id-dumbbell"></use>
                    </svg>
                    <div className={css.tipText}>
                      <p className={css.tipTitle}>Активність</p>
                      <p className={css.tipDescription}>{momData?.comfortTips?.[1]?.tip}</p>
                    </div>
                  </li>

                  <li className={css.tipItem}>
                    <svg className={css.icon} width="24" height="24">
                      <use href="/icons.svg#id-sofa"></use>
                    </svg>
                    <div className={css.tipText}>
                      <p className={css.tipTitle}>Відпочинок</p>
                      <p className={css.tipDescription}>{momData?.comfortTips?.[2]?.tip}</p>
                    </div>
                  </li>
                </ul>
              </div>
              <TasksReminderCard />
            </div>
          </div>
        )}
      </section>
    </>
  );
}