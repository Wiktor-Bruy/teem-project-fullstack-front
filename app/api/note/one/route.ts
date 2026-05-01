import { NextResponse} from 'next/server';
import { api } from '../../api';
import { cookies} from 'next/headers';
import { isAxiosError } from 'axios';

type Props = {
  params: Promise<{ noteId: string }>;
};

export async function GET(request: Request, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { noteId } = await params;
    const res = await api.get(`/notes/${noteId}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status || 500 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
