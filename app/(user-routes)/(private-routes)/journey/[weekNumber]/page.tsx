'use client';

import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import { useQuery } from '@tanstack/react-query';
import { getBabyState, getMomState, homePrivate } from '@/lib/api/clientApi';
import { useParams, useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useEffect } from "react";

//getBabyState (image, weekNumber, babyActivity, babyDevelopment interestingFact)
//getMomState ( weekNumber, feelings { states[], sensationDescr}, comfortTips [_id, category, tip] interestingFact)

export default function Journey() {
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

  return <JourneyContent currentWeek={data.currentWeek ?? 1} />;
}

function JourneyContent({ currentWeek }: { currentWeek: number }) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const selectedWeekFromRoute = Number(params?.weekNumber);

  const selectedWeek =
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
    enabled: selectedWeek > 0,
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
    enabled: selectedWeek > 0,
    placeholderData: undefined,
    staleTime: 0,
  });

  useEffect(() => {
  console.log('selectedWeek changed:', selectedWeek);
}, [selectedWeek]);

useEffect(() => {
  if (babyData) {
    console.log('babyData received:', babyData.weekNumber);
  }
}, [babyData]);

useEffect(() => {
  if (momData) {
    console.log('momData received:', momData.weekNumber);
  }
}, [momData]);
  
  const isJourneyLoading =
    isBabyLoading ||
    isMomLoading ||
    isBabyFetching ||
    isMomFetching;

  const isJourneyError = isBabyError || isMomError;


  return (
    <>
      <GreetingBlock />

      <WeekSelector
        selectedWeek={selectedWeek}
        currentWeek={currentWeek}
        onWeekChange={(week) => {
  router.replace(`/journey/${week}`);
}}
      />

      {isJourneyError ? (
        <p>Не вдалося завантажити інформацію про тиждень</p>
      ) : (
        <JourneyDetails
          key={pathname}
          babyData={babyData}
          momData={momData}
          isLoading={isJourneyLoading}
        />
      )}
    </>
  );
}


// export default function Journey() {
//   const router = useRouter();
//   const params = useParams();
//   const {
//     data,
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ['weeks'],
//     queryFn: () => homePrivate(),
//   });

//   // loading state
//   if (isLoading) {
//     return <p>Завантаження...</p>;
//   }

//   // error state
//   if (isError || !data) {
//     return <p>Не вдалося завантажити дані</p>;
//   }

//   // current week from backend
//   const currentWeek = data.currentWeek;

//   // selected week from route
//   const selectedWeekFromRoute = Number(
//     params?.weekNumber
//   );

//   // final selected week
//   const selectedWeek =
//     Number.isFinite(selectedWeekFromRoute) &&
//     selectedWeekFromRoute > 0 &&
//     selectedWeekFromRoute <= currentWeek
//       ? selectedWeekFromRoute
//       : currentWeek;

//   // baby data
//   const {
//     data: babyData,
//     isLoading: isBabyLoading,
//     isError: isBabyError,
//     isFetching: isBabyFetching,
//   } = useQuery({
//     queryKey: ['babyState', selectedWeek],

//     queryFn: () =>
//       getBabyState(selectedWeek),

//     enabled: !!selectedWeek,

//     placeholderData: undefined,

//     staleTime: 0,
//   });

//   // mom data
//   const {
//     data: momData,
//     isLoading: isMomLoading,
//     isError: isMomError,
//     isFetching: isMomFetching,
//   } = useQuery({
//     queryKey: ['momState', selectedWeek],

//     queryFn: () =>
//       getMomState(selectedWeek),

//     enabled: !!selectedWeek,

//     placeholderData: undefined,

//     staleTime: 0,
//   });

//   // loading state for tabs
//   const isJourneyLoading =
//     isBabyLoading ||
//     isMomLoading ||
//     isBabyFetching ||
//     isMomFetching;

//   // error state for tabs
//   const isJourneyError =
//     isBabyError ||
//     isMomError;


//   return (
//     <>
//       <GreetingBlock />
//       <WeekSelector
//         selectedWeek={selectedWeek}
//         currentWeek={currentWeek}
//         onWeekChange={(week) =>  router.push(`/journey/${week}`)}
//       />
//       {isJourneyError ? (
//         <p>Не вдалося завантажити інформацію про тиждень</p>
//       ) : (
//           <JourneyDetails
//           key={selectedWeek}
//           babyData={babyData}
//           momData={momData}
//           isLoading={isJourneyLoading}
//         />
//       )}
//     </>
//   );
// }
