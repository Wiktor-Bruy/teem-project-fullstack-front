import { nextServer } from './api';

//------------------------------------------------Функція-логіну
export async function login() {}

//------------------------------------------------Функція-реєстрації
export async function register() {}

//------------------------------------------------Функція-рефрешу-сесії
export async function checkSession() {
  const res = await nextServer.get('/auth/session');
  return res.data;
}

//------------------------------------------------Функція-логауту
export async function logout() {
  const res = await nextServer.post('/auth/logout');
  return res.data;
}

//------------------------------------------------Повертає-користувача
export async function getMe() {
  const res = await nextServer.get('/user/me');
  return res.data;
}

//------------------------------------------------Повертає-всі-записи-щоденника
export async function getNotes() {}

//------------------------------------------------Повертає-один-запис-щоденника
export async function getNote() {}

//------------------------------------------------Ошовлює-запис-щоденника
export async function updateNote() {}

//------------------------------------------------Видаляє-запис-щоденника
export async function deleteNote() {}

//------------------------------------------------Створює-запис-щоденника
export async function createNote() {}

//------------------------------------------------Створює-задачу
export async function createTask() {}

//------------------------------------------------Оновлює-задачу
export async function updateTask() {}

//------------------------------------------------Оновлює-аватар
export async function updateAvatar(file: File) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await nextServer.post('/user/avatar', formData);
  return res.data;
}

//------------------------------------------------Оновлює-дані користувача
export async function updateUser(data: any) {
  const res = await nextServer.put('/user', data);
  return res.data;
}

//------------------------------------------------Повертає-стан-дитини
export async function getBabyState() {
  const res = await nextServer.get('/home/baby');
  return res.data;
}
