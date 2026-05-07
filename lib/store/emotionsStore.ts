import { create } from 'zustand';
import { Emotions } from '@/types/types';

interface EmotionsStore {
  emotions: Emotions | [];
  setEmotions: (emotions: Emotions) => void;
}

export const useEmoStore = create<EmotionsStore>()(set => ({
  emotions: [],
  setEmotions: (emotions: Emotions) => {
    set(() => ({ emotions }));
  },
}));
