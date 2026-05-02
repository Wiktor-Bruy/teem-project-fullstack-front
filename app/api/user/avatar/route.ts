import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const formData = await req.formData();

    const response = await api.put('/users/avatar', formData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data, { status: response.status });
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
