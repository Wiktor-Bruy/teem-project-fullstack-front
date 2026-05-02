import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/`,
      {
        method: 'GET',
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(errorData, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: 'Server error while fetching public data' },
      { status: 500 }
    );
  }
}