'use client';

import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import { useQuery } from '@tanstack/react-query';
import { getBabyState, getMomState, homePrivate } from '@/lib/api/clientApi';
import { useParams, useRouter } from 'next/navigation';

//getBabyState (image, weekNumber, babyActivity, babyDevelopment interestingFact)
//getMomState ( weekNumber, feelings { states[], sensationDescr}, comfortTips [_id, category, tip] interestingFact)

export default function Journey() {
  const router = useRouter();
  const params = useParams();
  const { data, isLoading, isError } = useQuery({
      queryKey: ['weeks'],
    queryFn: () => homePrivate(),
  });

    if (isLoading) {
    return <p>Завантаження...</p>;
  }

  if (isError || !data) {
    return <p>Не вдалося завантажити дані</p>;
  }

  const currentWeek = data?.currentWeek ?? 1;

const selectedWeekFromRoute = Number(params?.weekNumber);
  const selectedWeek =
    Number.isFinite(selectedWeekFromRoute) &&
    selectedWeekFromRoute > 0 &&
    selectedWeekFromRoute <= currentWeek
      ? selectedWeekFromRoute
      : currentWeek;

  // const { data: babyData, isLoading: isBabyLoading, isError : isBabyError } = useQuery({
  //   queryKey: ['babyState', selectedWeek],
  //   queryFn: () => getBabyState(selectedWeek),
  // });

  // const { data: momData, isLoading: isMomLoading, isError : isMomError } = useQuery({
  //   queryKey: ['momState', selectedWeek],
  //   queryFn: () => getMomState(selectedWeek),
  // });


  if (isLoading || !data) {
    return null;
  }

  return (
    <>
      <GreetingBlock />
      <WeekSelector
        selectedWeek={selectedWeek}
        currentWeek={currentWeek}
        onWeekChange={(week) =>  router.push(`/journey/${week}`)}
      />
      {/* <JourneyDetails babyData={babyData} momData={momData} /> */}
    </>
  );
}
