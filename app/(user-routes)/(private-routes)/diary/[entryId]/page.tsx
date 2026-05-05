import { getNote } from '@/lib/api/serverApi';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';

interface Props {
  params: Promise<{ entryId: string }>;
}

export default async function DiaryDetails({ params }: Props) {
  const { entryId } = await params;
  const note = await getNote(entryId);

  return (
    <>
      <Breadcrumbs lastLabel={note.title} />
      <DiaryEntryDetails />
    </>
  );
}