export interface User {
  _id: string;
  name: string;
  email: string;
  gender?: BabyGender;
  dueDate?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export type BabyGender = 'boy' | 'girl' | 'unknown';

export interface Emotion {
  _id: string;
  title: string;
}

export type Emotions = string[];

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
  emotions: Emotion[];
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
  title?: string;
  description?: string;
  emotions?: string[];
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
  week: number;
  daysLeft: number;
  weight?: string;
  size?: string;
  description?: string;
  advice?: string;
}

export interface MomState {
  _id?: string;
  week: number;
  feeling?: Emotions;
  note?: string;
}

export interface HomePublicResponse {
  week: number;
  daysLeft: number;
  babyState?: BabyState;
  momTip?: string;
}

export interface HomePrivateResponse extends HomePublicResponse {
  babyState?: BabyState;
  momState?: MomState;
}

export interface AuthResponse {
  user: User;
}

export interface Task {
  title: string;
  date: string;
  isDone?: boolean;
}
