import { NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';

export async function GET() {
  try {
    const res = await api.get('/');

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.message, data: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { message: 'Server error while fetching public data' },
      { status: 500 }
    );
  }
}
