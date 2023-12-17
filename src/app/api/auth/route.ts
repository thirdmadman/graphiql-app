import { SESSION_EXPIRES_IN } from '@/constants';
import { adminAuth } from '@/lib/firebase/firebase-admin-config';
import { auth } from '@/lib/firebase/firebase-config';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server';

interface ILoginData {
  email: string;
  password: string;
}

export async function GET(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  //Use Firebase Admin to validate the session cookie
  const decodedClaims = await adminAuth?.verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

export async function POST(request: NextRequest) {
  if (!auth || !adminAuth) {
    return NextResponse.json({}, { status: 500 });
  }

  const response = NextResponse.json({ isError: true }, { status: 401 });

  const loginData = (await request.json()) as ILoginData;

  if (loginData?.email && loginData.password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      const { user } = userCredential;
      const jwt = await user.getIdToken();

      if (jwt) {
        const sessionCookie = await adminAuth.createSessionCookie(jwt, {
          expiresIn: SESSION_EXPIRES_IN,
        });

        const options = {
          name: 'session',
          value: sessionCookie,
          maxAge: SESSION_EXPIRES_IN,
          httpOnly: true,
          secure: true,
        };

        const successResp = NextResponse.json(
          { isError: true },
          { status: 200 }
        );
        successResp.cookies.set(options);
        return successResp;
      }
    } catch (e) {
      if (e instanceof FirebaseError) {
        switch (e.code) {
          case 'auth/invalid-email':
            console.error('Invalid email address');
            break;

          default:
            console.error(e.message);
        }
      } else {
        console.error('An error occurred, please try again later.');
      }
    }
  }

  return response;
}

export async function DELETE(request: NextRequest) {
  if (!auth || !adminAuth) {
    return NextResponse.json({}, { status: 500 });
  }

  const token = request.cookies.get('session')?.value;

  if (!token) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const response = NextResponse.json({}, { status: 200 });

  await invalidateLogin(token, response);

  return response;
}

// Create a separate file for this utility function if you prefer that way
export const invalidateLogin = async (
  token: string,
  response: NextResponse
) => {
  if (!adminAuth) {
    return;
  }

  const decodedClaims = await adminAuth.verifySessionCookie(token, true);

  await adminAuth.revokeRefreshTokens(decodedClaims.uid);

  const options = {
    name: 'session',
    value: '',
    maxAge: -1,
  };

  response.cookies.set(options);

  return;
};
