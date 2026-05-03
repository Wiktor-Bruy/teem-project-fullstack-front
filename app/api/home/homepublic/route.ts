import { NextResponse } from 'next/server';
import { api } from '../../api';

export async function GET() {
  try {
    const res = await api.get("/");

    return NextResponse.json(res.data, { status: res.status });
  } catch (error: any) {
    return NextResponse.json(
      { message: 'Server error while fetching public data' },
      { status: error.response?.status || 500 }
    );
  }
}