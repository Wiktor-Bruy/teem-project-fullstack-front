"use client";

import { useState } from "react";
import AddDiaryEntryModal from "@/components/AddDiaryEntryModal/AddDiaryEntryModal";

export default function TestPage() {
  const [open, setOpen] = useState(true); 

  return (
    <div style={{ padding: 40 }}>
      <h1>Тест модалки</h1>

      <button onClick={() => setOpen(true)}>
        Відкрити модалку
      </button>

      <AddDiaryEntryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSuccess={() => setOpen(false)}
      />
    </div>
  );
}