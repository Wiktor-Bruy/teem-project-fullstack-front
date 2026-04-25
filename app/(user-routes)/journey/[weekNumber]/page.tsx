import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';

export default function Journey() {
  return (
    <>
      <p>
        Блок Подорож вагітності | JourneyPage | route: /journey/[weekNumber]
      </p>
      <GreetingBlock />
      <WeekSelector />
      <JourneyDetails />
    </>
  );
}
