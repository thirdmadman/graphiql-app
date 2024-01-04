import { SESSION_EXPIRES_IN } from '@/constants';
import { adminAuth } from '@/lib/firebase/firebase-admin-config';
import { auth } from '@/lib/firebase/firebase-config';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server';
import { invalidateLogin } from './invalidateLogin';
import { SignInErrorCodes } from '@/locales/locale';

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

  const response = NextResponse.json({ isError: false }, { status: 401 });

  try {
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
            { isError: false },
            { status: 200 }
          );
          successResp.cookies.set(options);
          return successResp;
        }
      } catch (e) {
        let message = '';
        let errorCode = '';
        if (e instanceof FirebaseError) {
          switch (e.code) {
            case 'auth/too-many-requests':
              message =
                'Too many requests. Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.';
              errorCode = SignInErrorCodes.TooManyRequests;
              break;
            case 'auth/invalid-credential':
              message = 'Invalid credentials. Please check the entered data.';
              errorCode = SignInErrorCodes.InvalidCredentials;
              break;
            default:
              message = `Authorization service error. ${
                e.code && `(Firebase error code: ${e.code})`
              }`;
              errorCode = SignInErrorCodes.AuthServiceError;
          }
        } else {
          message = 'An error occurred, please try again later.';
          errorCode = SignInErrorCodes.UnknownError;
        }
        return NextResponse.json({ message, errorCode }, { status: 401 });
      }
    }
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 400 });
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
