import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { parse } from 'cookie';

export async function POST() {
  const cookieStore = await cookies();

  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false, message: 'No refresh token found' }, { status: 400 });
  }

  try {
    const apiRes = await api.post('/auth/refresh', {
      refreshToken: refreshToken,
    });

    const setCookie = apiRes.headers['set-cookie'];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: parsed['Max-Age'] ? Number(parsed['Max-Age']) : undefined,
        };

        if (parsed.accessToken) cookieStore.set('accessToken', parsed.accessToken, options);
        if (parsed.refreshToken) cookieStore.set('refreshToken', parsed.refreshToken, options);
      }

      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: 'No new cookies returned' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error during session refresh:', error);
    return NextResponse.json({ success: false, message: 'Failed to refresh session' }, { status: 500 });
  }
}