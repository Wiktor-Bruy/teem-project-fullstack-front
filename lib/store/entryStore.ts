import { create } from 'zustand';

interface EmotionsStore {
  title: string;
  setTitle: (title: string) => void;
}

export const useEntryStore = create<EmotionsStore>()(set => ({
  title: '',
  setTitle: (title: string) => {
    set(() => ({ title }));
  },
}));
