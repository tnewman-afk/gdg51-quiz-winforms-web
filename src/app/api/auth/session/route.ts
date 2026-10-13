import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken, COOKIE_NAME } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const cookie = request.cookies.get(COOKIE_NAME)?.value;
  const isUnlocked = verifySessionToken(cookie);

  return NextResponse.json({ unlocked: isUnlocked });
}
