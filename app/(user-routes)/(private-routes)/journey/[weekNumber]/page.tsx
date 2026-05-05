'use client';

import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import { useQuery } from '@tanstack/react-query';
import { getBabyState, getMomState } from '@/lib/api/clientApi';
import { useParams } from 'next/navigation';

export default function Journey() {
  const params = useParams<{ weekNumber?: string }>();
  const { data: babyData, isLoading: isBabyLoading, isError : isBabyError } = useQuery({
    queryKey: ['babyState'],
    queryFn: getBabyState,
  });

  const { data: momData, isLoading: isMomLoading, isError : isMomError } = useQuery({
    queryKey: ['momState'],
    queryFn: getMomState,
  });

  const isLoading = isBabyLoading || isMomLoading;
  if (isLoading || !babyData) return <div>Завантаження...</div>;
const isError = isBabyError || isMomError;
if (isError) return <div>Помилка</div>;

  const selectedWeekFromRoute = Number(params?.weekNumber);
  const selectedWeek = Number.isFinite(selectedWeekFromRoute) && selectedWeekFromRoute > 0
    ? selectedWeekFromRoute
    : babyData.weekNumber;

  return (
    <>
      <GreetingBlock />
      <WeekSelector
        selectedWeek={selectedWeek}
        currentWeek={babyData.weekNumber}
        onWeekChange={(week) =>  console.log(week)}
      />
      <JourneyDetails babyData={babyData} momData={momData} />
    </>
  );
}