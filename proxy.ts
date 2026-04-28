import { NextRequest, NextResponse } from 'next/server';

export async function proxy(req: NextRequest) {
  console.log(req.nextUrl.pathname);
  return NextResponse.next();
}
