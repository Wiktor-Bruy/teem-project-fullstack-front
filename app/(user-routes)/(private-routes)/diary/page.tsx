import GreetingBlock from '@/components/GreetingBlock/GreetingBlock';
import DiaryList from '@/components/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';

export default function Diary() {
  return (
    <>
      <p>Diary</p>
      <GreetingBlock />
      <DiaryList />
      <DiaryEntryDetails />
    </>
  );
}
