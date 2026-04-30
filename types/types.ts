export interface User {
  name: string;
}

export type BabyGender = 'girl' | 'boy' | 'not selected';

export type Emotions = 'перелік емоцій';

export interface Task {
  title: string;
  date: string;
  isDone?: boolean;
}
