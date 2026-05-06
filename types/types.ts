export interface User {
  _id: string;
  name: string;
  email: string;
  gender?: BabyGender;
  dueDate?: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
}

export type BabyGender = 'boy' | 'girl' | 'unknown';

export interface Emotion {
  _id: string;
  title: string;
}

export type Emotions = Emotion[];

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  gender?: BabyGender;
  dueDate?: string;
  email?: string;
}

export interface Note {
  _id: string;
  title: string;
  description: string;
  emotions: Emotions;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteRequest {
  title: string;
  description: string;
  emotions: string[];
}

export interface UpdateNoteRequest {
  title: string;
  description: string;
  emotions: string[];
}

export interface TaskResponse {
  _id: string;
  title: string;
  date: string;
  isDone: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  date: string;
}

export interface BabyState {
  _id?: string;
  weekNumber: number;
  daysLeft: number;
  weight?: string;
  size?: string;
  description?: string;
  advice?: string;
  image?: string;
  analogy?: string;
  babyDevelopment?: string;
  interestingFact?: string;
}

interface ComfortTip {
  _id: string;
  category: string;
  tip: string;
}

export interface MomState {
  _id?: string;
  weekNumber: number;
  note?: string;
  comfortTips: ComfortTip[];
feelings: { states: string[]; sensationDescr: string };
}

interface homeBaby {
  babySize: number;
  babyWeight: number;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  momDailyTips: string;
}

export interface HomeResponse {
  currentWeek: number;
  daysLeft: number;
  babyState: homeBaby;
}

export interface AuthResponse {
  user: User;
}

export interface Task {
  _id: string;
  title: string;
  date: string;
  isDone: boolean;
  owner: string;
  createdAt: string;
  updatedAt: string;
}
