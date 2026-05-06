import { NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();

    const { searchParams } = new URL(request.url);
    const week = searchParams.get('week');

    console.log('week from route handler', week);

    const res = await api.get('/weeks/baby', {
  params: {
    week,
  },
        headers: {
          Cookie: cookieStore.toString(),
          'Cache-Control': 'no-cache',
        },
      }
    );

console.log('baby route week param:', week);
    console.log('baby backend returned week:', res.data.weekNumber);

    return NextResponse.json(res.data, {
      status: res.status,

      headers: {
        'Cache-Control':
          'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, data: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Some server error...' },
      { status: 500 }
    );
  }
}
