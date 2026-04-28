import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/api';
import { cookies } from 'next/headers';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const res = await api.get('/home/baby', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(res.data);
  } catch (error) {
    console.error('Error fetching baby state:', error);
    return NextResponse.json(
      { error: 'Failed to fetch baby state' },
      { status: 500 }
    );
  }
}
