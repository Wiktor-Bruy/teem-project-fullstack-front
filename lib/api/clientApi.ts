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
export async function getMe() {}

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
export async function updateAvatar() {}

//------------------------------------------------Оновлює-дані користувача
export async function updateUser() {}
