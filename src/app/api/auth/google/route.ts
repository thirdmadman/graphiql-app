import { SESSION_EXPIRES_IN } from '@/constants';
import { adminAuth } from '@/lib/firebase/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const authorization = request.headers.get('Authorization');

  if (!adminAuth) {
    return NextResponse.json({}, { status: 500 });
  }

  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (decodedToken) {
      const sessionCookie = await adminAuth.createSessionCookie(idToken, {
        expiresIn: SESSION_EXPIRES_IN,
      });

      const options = {
        name: 'session',
        value: sessionCookie,
        maxAge: SESSION_EXPIRES_IN,
        httpOnly: true,
        secure: true,
      };
      const response = NextResponse.json({}, { status: 200 });
      response.cookies.set(options);
      return response;
    }
  }

  return NextResponse.json({}, { status: 401 });
}
