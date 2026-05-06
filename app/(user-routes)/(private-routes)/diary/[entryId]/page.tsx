import { getNote } from '@/lib/api/serverApi';
import DiaryEntryClient from './DiaryEntry.client';

interface Props {
  params: Promise<{ entryId: string }>;
}

export default async function DiaryDetails({ params }: Props) {
  const { entryId } = await params;
  const note = await getNote(entryId);

  return (
    <>
      <DiaryEntryClient note={note} />
    </>
  );
}
