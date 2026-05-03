export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';

function logErrorResponse(error: unknown, label = 'Error'): void {
  if (process.env.NODE_ENV === 'production') return;

  console.error(`\n[${label}]`);
  console.dir(error, { depth: null });
}

export async function PUT(req: NextRequest) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();

    const apiRes = await api.put('/users', body, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });

    return NextResponse.json(apiRes.data, {
      status: apiRes.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data, 'Axios Error');

      return NextResponse.json(
        {
          error: error.response?.data || error.message,
        },
        {
          status: error.response?.status || 500,
        }
      );
    }

    logErrorResponse(error, 'Unknown Error');

    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
