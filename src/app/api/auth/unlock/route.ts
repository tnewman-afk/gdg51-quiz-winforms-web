import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, createSessionToken, COOKIE_NAME } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Small delay to protect against brute-force attacks
    await new Promise((resolve) => setTimeout(resolve, 350));

    if (!verifyPassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Access denied: Incorrect lockout password.' },
        { status: 401 }
      );
    }

    const token = createSessionToken();
    const response = NextResponse.json({ success: true, message: 'Access granted.' });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Malformed request or server error.' },
      { status: 400 }
    );
  }
}
