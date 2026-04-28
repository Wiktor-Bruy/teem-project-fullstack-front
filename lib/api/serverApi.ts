import { cookies } from 'next/headers';
import { nextServer } from './api';
import type {
  User,
  Note,
  Task,
  BabyState,
  MomState,
  HomePublicResponse,
  HomePrivateResponse,
} from '../../types/types';

export async function checkSession(): Promise<User | null> {
  try {
    const cookieStore = await cookies();
    const res = await nextServer.get('/auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return res.data;
  } catch {
    return null;
  }
}

//------------------------------------------------Повертає-користувача
export async function getMe(userId: string): Promise<User> {
  const cookieStore = await cookies();
  const res = await nextServer.get(`/user/${userId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

//------------------------------------------------Повертає-всі-записи-щоденника
export async function getNotes(): Promise<Note[]> {
  const cookieStore = await cookies();
  const res = await nextServer.get('/note', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

//------------------------------------------------Повертає-один-запис-щоденника-по-id
export async function getNote(noteId: string): Promise<Note> {
  const cookieStore = await cookies();
  const res = await nextServer.get(`/note/${noteId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

//------------------------------------------------Повертає-всі-таски
export async function getTasks(): Promise<Task[]> {
  const cookieStore = await cookies();
  const res = await nextServer.get('/task', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

//-------------Повертає-терміни-(дефолт-для-незареєстрованого-коректні-для-зареєстрованого)
export async function getTerm(
  isLoggedIn: boolean = false
): Promise<{ week: number; daysLeft: number }> {
  try {
    const cookieStore = await cookies();
    if (isLoggedIn) {
      const res = await nextServer.get('/home', {
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      return {
        week: res.data.week,
        daysLeft: res.data.daysLeft,
      };
    }
    const res = await nextServer.get('/');
    return {
      week: res.data.week,
      daysLeft: res.data.daysLeft,
    };
  } catch {
    return { week: 0, daysLeft: 0 };
  }
}

//------------------------------------------------Повертає-публічний-дашборд
export async function getHomePublic(): Promise<HomePublicResponse> {
  const res = await nextServer.get('/');
  return res.data;
}

//------------------------------------------------Повертає-приватний-дашборд
export async function getHomePrivate(): Promise<HomePrivateResponse> {
  const cookieStore = await cookies();
  const res = await nextServer.get('/home', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

//------------------------------------------------Повертає-стан-дитини
export async function getBabyState(): Promise<BabyState> {
  const cookieStore = await cookies();
  const res = await nextServer.get('/home/baby', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}

//------------------------------------------------Повертає-стан-мами
export async function getMomState(): Promise<MomState> {
  const cookieStore = await cookies();
  const res = await nextServer.get('/home/mom', {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res.data;
}
