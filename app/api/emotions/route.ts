import { api } from '../api';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = await cookies();

    const res = await api.get('/emotions', {
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
    }
    return NextResponse.json(
      { error: 'Some server error...' },
      { status: 500 }
    );
    
  }
}
