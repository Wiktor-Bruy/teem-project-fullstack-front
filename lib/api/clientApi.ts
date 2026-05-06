import { nextServer } from './api';
import type {
  LoginRequest,
  RegisterRequest,
  User,
  Note,
  CreateNoteRequest,
  UpdateNoteRequest,
  TaskResponse,
  CreateTaskRequest,
  UpdateUserRequest,
  BabyState,
  MomState,
} from '../../types/types';

//------------------------------------------------Функція-логіну
export async function login(credentials: LoginRequest): Promise<User> {
  const res = await nextServer.post<User>('/auth/login', credentials);
  return res.data;
}

//------------------------------------------------Функція-реєстрації
export async function register(credentials: RegisterRequest): Promise<User> {
  const res = await nextServer.post<User>('/auth/register', credentials);
  return res.data;
}

//------------------------------------------------Функція-рефрешу-сесії
export async function refreshSession() {
  const res = await nextServer.post('/auth/refresh');
  return res.data;
}

//------------------------------------------------Функція-логауту
export async function logout() {
  const res = await nextServer.post('/auth/logout');
  return res.data;
}

//------------------------------------------------Повертає-користувача

export async function getMe(): Promise<User | null> {
  const res = await nextServer.get<User>('/user/me');
  return res.data;
}

//------------------------------------------------Оновлює-дані користувача
export async function updateUser(data: UpdateUserRequest): Promise<User> {
  const res = await nextServer.put<User>('/user/update', data);
  return res.data;
}

//------------------------------------------------Оновлює-аватар
export async function updateAvatar(file: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append('avatar', file);
  const res = await nextServer.put<{ url: string }>('/user/avatar', formData);
  return res.data;
}

//------------------------------------------------Повертає-всі-записи-щоденника
export async function getNotes(): Promise<Note[]> {
  const res = await nextServer.get<Note[]>('/note/all');
  return res.data;
}

//------------------------------------------------Повертає-один-запис-щоденника
export async function getNote(noteId: string): Promise<Note> {
  const res = await nextServer.get<Note>(`/note/one/${noteId}`);
  return res.data;
}

//------------------------------------------------Створює-запис-щоденника
export async function createNote(data: CreateNoteRequest): Promise<Note> {
  const res = await nextServer.post<Note>('/note/create', data);
  return res.data;
}

//------------------------------------------------Оновлює-запис-щоденника
export async function updateNote(
  noteId: string,
  data: UpdateNoteRequest
): Promise<Note> {
  const res = await nextServer.patch<Note>(`/note/update/${noteId}`, data);
  return res.data;
}

//------------------------------------------------Видаляє-запис-щоденника
export async function deleteNote(noteId: string): Promise<Note> {
  const res = await nextServer.delete<Note>(`/note/delede/${noteId}`);
  return res.data;
}

//------------------------------------------------Повертає-всі-таски
export async function getTasks(): Promise<TaskResponse[]> {
  const res = await nextServer.get<TaskResponse[]>('/task/all');
  return res.data;
}

//------------------------------------------------Створює-задачу
export async function createTask(
  data: CreateTaskRequest
): Promise<TaskResponse> {
  const res = await nextServer.post<TaskResponse>('/task/create', data);
  return res.data;
}

//------------------------------------------------Оновлює-задачу
export async function updateTask(taskId: string): Promise<TaskResponse> {
  const res = await nextServer.patch<TaskResponse>(`/task/update/${taskId}`);
  return res.data;
}

//------------------------------------------------Публічний-дашборд
export async function homePublic() {
  const res = await nextServer.get('/home/homepublic');
  return res.data;
}

//------------------------------------------------Приватний-дащборд
export async function homePrivate() {
  const res = await nextServer.get('/home/homeprivate');
  return res.data;
}

//------------------------------------------------Стан-мами
export async function getMomState(
  week?: number
): Promise<MomState> {
  console.log('request mom week', week);

  const res = await nextServer.get<MomState>(
    '/home/mom',
    {
      params: {
        week,
      },

      headers: {
        'Cache-Control': 'no-cache',
      },
    }
  );

  return res.data;
}

//------------------------------------------------Стан-дитини
export async function getBabyState(
  week?: number
): Promise<BabyState> {
  console.log('request week', week);

  const res = await nextServer.get<BabyState>(
    '/home/baby',
    {
      params: {
        week,
      },
    }
  );

  return res.data;
}

//------------------------------------------------Емоції
export async function getEmotions() {
  const res = await nextServer.get('/emotions');
  return res.data;
}
