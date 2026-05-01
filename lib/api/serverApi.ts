import { cookies } from 'next/headers';
import { nextServer } from './api';

export interface BabyState {
  _id: string;
  analogy: boolean;
  weekNumber: number;
  babySize: number;
  babyWeight: number;
  image: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string;
  momDailyTips: string[];
}

export interface Note {
  _id: string;
  title: string;
  description: string;
  emotions: string[];
  userId: string;
  createdAt: string;
  updatedAt: string;
}

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
export async function getNote(noteId: string): Promise<Note> {
  try {
    const res = await nextServer.get<Note>(`/note/${noteId}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching note:', error);
    throw error;
  }
}
//--------------------------------------------Повертає-всі-таски
export async function getTasks() {}

//-------------Повертає-терміни-(дефолт-для-незареєстрованого-коректні-для-зареєстрованого)
export async function getTerm() {}

//-------------------------------------------Повертає-стан-дитини
export async function getBabyState(): Promise<BabyState> {
  try {
    const res = await nextServer.get<BabyState>('/home/baby');
    return res.data;
  } catch (error) {
    console.error('Error fetching baby state:', error);
    throw error;
  }
}




//------------------------------------------------Повертає-стан-мами
export async function getMomState() {}
