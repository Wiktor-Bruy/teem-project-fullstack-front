import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import WeekSelector from '@/components/WeekSelector/WeekSelector';
import JourneyDetails from '@/components/JourneyDetails/JourneyDetails';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

interface Props {
  params: Promise<{ weekNumber: string }>;
}

export default async function Journey({ params }: Props) {
  const { weekNumber } = await params;

  return (
    <>
      <Breadcrumbs lastLabel={`Тиждень ${weekNumber}`} />
      <GreetingBlock />
      <WeekSelector />
      <JourneyDetails />
    </>
  );
}