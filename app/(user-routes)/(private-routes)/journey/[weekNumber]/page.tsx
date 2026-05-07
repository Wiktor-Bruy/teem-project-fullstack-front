'use client';
import css from "./page.module.css";
import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import { useQuery } from '@tanstack/react-query';
import { getBabyState, getMomState, homePrivate } from '@/lib/api/clientApi';
import { useParams, useRouter } from 'next/navigation';

export default function Journey() {
  const router = useRouter();
  const params = useParams();

  const {
    data: homeData,
    isLoading: isHomeLoading,
    isError: isHomeError,
  } = useQuery({
    queryKey: ['weeks'],
    queryFn: () => homePrivate(),
  });

  const currentWeek = homeData?.currentWeek;

  const weekParam = Array.isArray(params?.weekNumber)
    ? params.weekNumber[0]
    : params?.weekNumber;

  const selectedWeekFromRoute = Number(weekParam);

  const selectedWeek =
    currentWeek &&
    Number.isFinite(selectedWeekFromRoute) &&
    selectedWeekFromRoute > 0 &&
    selectedWeekFromRoute <= currentWeek
      ? selectedWeekFromRoute
      : currentWeek;

  const {
    data: babyData,
    isLoading: isBabyLoading,
    isError: isBabyError,
    isFetching: isBabyFetching,
  } = useQuery({
    queryKey: ['babyState', selectedWeek],
    queryFn: () => getBabyState(selectedWeek),
    enabled: Boolean(selectedWeek),
    placeholderData: undefined,
    staleTime: 0,
  });

  const {
    data: momData,
    isLoading: isMomLoading,
    isError: isMomError,
    isFetching: isMomFetching,
  } = useQuery({
    queryKey: ['momState', selectedWeek],
    queryFn: () => getMomState(selectedWeek),
    enabled: Boolean(selectedWeek),
    placeholderData: undefined,
    staleTime: 0,
  });

  const isLoading =
    isHomeLoading ||
    isBabyLoading ||
    isMomLoading ||
    isBabyFetching ||
    isMomFetching;

  const isError = isHomeError || isBabyError || isMomError;

  if (isHomeLoading) {
    return <div>Завантаження...</div>;
  }

  if (isHomeError || !homeData || !currentWeek) {
    return <div>Не вдалося завантажити поточний тиждень</div>;
  }

  return (<>
    <div className={css.wrapperGreet}>
      <GreetingBlock />
    </div>
    <WeekSelector
      selectedWeek={selectedWeek}
      currentWeek={currentWeek}
      onWeekChange={(week) => {
        router.replace(`/journey/${week}`);
      }}
    />
    {isError ? (
      <div>Помилка</div>
    ) : (
      <JourneyDetails
        key={selectedWeek}
        babyData={babyData}
        momData={momData}
        isLoading={isLoading}
      />
    )}
  </>
  );
}

