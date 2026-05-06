'use client';
import { useState } from 'react';

import type { Note } from '@/types/types';
import DiaryEntryDetails from '@/components/DiaryEntryDetails/DiaryEntryDetails';
import AddDiaryEntryModal from '@/components/AddDiaryEntryModal/AddDiaryEntryModal';

interface DiaryClientProps {
  note: Note;
}

export default function DiaryEntryClient({ note }: DiaryClientProps) {
  const [isModal, setIsModal] = useState(false);
  return (
    <>
      <DiaryEntryDetails entry={note} onEdit={() => setIsModal(true)} />
      {isModal && (
        <AddDiaryEntryModal
          initialData={note}
          onClose={() => setIsModal(false)}
        />
      )}
    </>
  );
}
