import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { api } from '../../../api';
import { isAxiosError } from 'axios';

interface Params {
  params: Promise<{ taskId: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
  try {
    const cookieStore = await cookies();
    const { taskId } = await params;
    const response = await api.patch(`/tasks/${taskId}`, null, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { message: error.message, data: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json(
      { error: 'Some server error...' },
      { status: 500 }
    );
  }
}
