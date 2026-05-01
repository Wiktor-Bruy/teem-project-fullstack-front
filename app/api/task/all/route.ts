import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { api } from '../../api';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await api.get('/task', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, data: error.response?.data },
        { status: error.status }
      );
    } else {
      return NextResponse.json(
        { error: 'Some server error...' },
        { status: 500 }
      );
    }
  }
}
