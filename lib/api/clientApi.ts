import { nextServer } from './api';
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponse,
  User,
  Note,
  CreateNoteRequest,
  UpdateNoteRequest,
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
} from '../../types/types';

//------------------------------------------------Функція-логіну
export async function login(credentials: LoginRequest): Promise<AuthResponse> {
  const res = await nextServer.post('/auth/login', credentials);
  return res.data;
}

//------------------------------------------------Функція-реєстрації
export async function register(
  credentials: RegisterRequest
): Promise<AuthResponse> {
  const res = await nextServer.post('/auth/register', credentials);
  return res.data;
}

//------------------------------------------------Функція-рефрешу-сесії
export async function checkSession(): Promise<User | null> {
  try {
    const res = await nextServer.get('/auth/session');
    return res.data;
  } catch {
    return null;
  }
}

export async function refreshSession(): Promise<AuthResponse> {
  const res = await nextServer.post('/auth/refresh');
  return res.data;
}

//------------------------------------------------Функція-логауту
export async function logout(): Promise<{ message: string }> {
  const res = await nextServer.post('/auth/logout');
  return res.data;
}

//------------------------------------------------Повертає-користувача
export async function getMe(): Promise<User> {
  const res = await nextServer.get('/user/me');
  return res.data;
}

//------------------------------------------------Оновлює-дані користувача
export async function updateUser(
  data: Partial<User> & { password?: string }
): Promise<User> {
  const res = await nextServer.put('/user/update', data);
  return res.data;
}

//------------------------------------------------Оновлює-аватар
export async function updateAvatar(formData: FormData): Promise<User> {
  const res = await nextServer.put('/user/update/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
}

//------------------------------------------------Повертає-всі-записи-щоденника
export async function getNotes(): Promise<Note[]> {
  const res = await nextServer.get('/note');
  return res.data;
}

//------------------------------------------------Повертає-один-запис-щоденника
export async function getNote(noteId: string): Promise<Note> {
  const res = await nextServer.get(`/note/${noteId}`);
  return res.data;
}

//------------------------------------------------Створює-запис-щоденника
export async function createNote(
  data: CreateNoteRequest
): Promise<Note> {
  const res = await nextServer.post('/note', data);
  return res.data;
}

//------------------------------------------------Оновлює-запис-щоденника
export async function updateNote(
  noteId: string,
  data: UpdateNoteRequest
): Promise<Note> {
  const res = await nextServer.put(`/note/${noteId}`, data);
  return res.data;
}

//------------------------------------------------Видаляє-запис-щоденника
export async function deleteNote(noteId: string): Promise<void> {
  await nextServer.delete(`/note/${noteId}`);
}

//------------------------------------------------Повертає-всі-таски
export async function getTasks(): Promise<Task[]> {
  const res = await nextServer.get('/task');
  return res.data;
}

//------------------------------------------------Створює-задачу
export async function createTask(data: CreateTaskRequest): Promise<Task> {
  const res = await nextServer.post('/task/create', data);
  return res.data;
}

//------------------------------------------------Оновлює-задачу
export async function updateTask(
  taskId: string,
  data: UpdateTaskRequest
): Promise<Task> {
  const res = await nextServer.patch(`/task/update/${taskId}`, data);
  return res.data;
}
