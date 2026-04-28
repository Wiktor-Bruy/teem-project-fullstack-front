export interface User {
  name: string;
  email: string;
  avatar?: string;
  gender?: BabyGender;
  dueDate?: string;
}

export type BabyGender = 'girl' | 'boy' | 'not selected';

export type Emotions = 'перелік емоцій';
