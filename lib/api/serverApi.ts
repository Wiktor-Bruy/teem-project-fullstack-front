import { cookies } from 'next/headers';
import { nextServer } from './api';

export async function checkSession() {
  const cookieStore = await cookies();

  const res = await nextServer.get('/auth/session', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

//------------------------------------------------Повертає-користувача
export async function getMe() {}

//------------------------------------------------Повертає-всі-записи-щоденника
export async function getNotes() {}

//------------------------------------------------Повертає-один-запис-щоденника-по-id
export async function getNote() {}

//------------------------------------------------Повертає-всі-таски
export async function getTasks() {}

//-------------Повертає-терміни-(дефолт-для-незареєстрованого-коректні-для-зареєстрованого)
export async function getTerm() {}

//------------------------------------------------Повертає-стан-дитини
export async function getBabyState() {
  const cookieStore = await cookies();

  const res = await nextServer.get('/home/baby', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

//------------------------------------------------Повертає-стан-мами
export async function getMomState() {}
