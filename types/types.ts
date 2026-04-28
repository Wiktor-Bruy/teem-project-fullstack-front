export interface User {
  name: string;
  _id?: string;
  email?: string;
  password?: string;
  avatar?: string;
  dueDate?: string;
  babyName?: string;
  babyGender?: BabyGender;
  createdAt?: string;
  updatedAt?: string;
}

export type BabyGender = 'girl' | 'boy' | 'not selected';

export type Emotions = 'перелік емоцій';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface UpdateUserRequest {
  name?: string;
  dueDate?: string;
  babyName?: string;
  babyGender?: BabyGender;
}

export interface Note {
  _id?: string;
  userId?: string;
  title: string;
  content: string;
  emotion?: Emotions;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  emotion?: Emotions;
  date?: string;
}

export interface UpdateNoteRequest extends Partial<CreateNoteRequest> {}

export type TaskStatus = 'pending' | 'completed' | 'in-progress';

export interface Task {
  _id?: string;
  userId?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  dueDate?: string;
}

export interface UpdateTaskRequest {
  status: TaskStatus;
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
  accessToken?: string;
  refreshToken?: string;
}
