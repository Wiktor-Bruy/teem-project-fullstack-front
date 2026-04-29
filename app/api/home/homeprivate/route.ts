import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AxiosError } from 'axios';
import { nextServer } from '@/lib/api/api';

export async function GET() {
  try {
    const cookieStore = cookies();

    const { data } = await nextServer.get('/home', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;

    return NextResponse.json(
      {
        message:
          err.response?.data?.message || 'Failed to fetch private home data',
      },
      {
        status: err.response?.status || 500,
      }
    );
  }
}
