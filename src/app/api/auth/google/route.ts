import {adminAuth} from '@/lib/redux/firebase/firebase-admin-config';
import {NextRequest, NextResponse} from 'next/server';

export async function POST(request: NextRequest) {
  const SESSION_EXPIRES_IN = 1000 * 60 * 60 * 24 * 5;

  const authorization = request.headers.get('Authorization');

  const response = NextResponse.json({}, {status: 200});

  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await adminAuth.verifyIdToken(idToken);

    if (decodedToken) {
      //Generate session cookie
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

      response.cookies.set(options);
    }
  }

  return response;
}
