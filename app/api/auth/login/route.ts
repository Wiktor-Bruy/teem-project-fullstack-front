import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';

function logErrorResponse(errorObj: unknown, label = 'Error'): void {
  if (process.env.NODE_ENV === 'production') return;

  const green = '\x1b[32m';
  const red = '\x1b[31m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${red}${label}:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

export async function POST(req: NextRequest) {

  try {
    const body = await req.json();
    const apiRes = await api.post('/auth/login', body, {
      withCredentials: true,
    });

    const response = NextResponse.json(apiRes.data, {
      status: apiRes.status,
    });

    const setCookie = apiRes.headers['set-cookie'];

    if (setCookie) {
      const cookieArray = Array.isArray(setCookie)
        ? setCookie
        : [setCookie];

      cookieArray.forEach((cookie) => {
        response.headers.append('Set-Cookie', cookie);
      });
    }
    return response;
  }

  catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data, 'Axios Error');
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
         { status: error.response?.status || 500 }
      );
    }
    logErrorResponse(error, 'Unknown Error');
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
