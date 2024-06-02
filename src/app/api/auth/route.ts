import { SESSION_EXPIRES_IN } from '@/constants';
import { adminAuth } from '@/lib/firebase/firebaseAdminConfig';
import { auth } from '@/lib/firebase/firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NextRequest, NextResponse } from 'next/server';
import { invalidateLogin } from './invalidateLogin';
import { SignInErrorCodes, signInPageEn } from '@/locales/locale';

interface ILoginData {
  email: string;
  password: string;
}

export async function GET(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  try {
    //Use Firebase Admin to validate the session cookie
    const decodedClaims = await adminAuth?.verifySessionCookie(session, true);

    if (!decodedClaims) {
      return NextResponse.json({ isLogged: false }, { status: 401 });
    }
  } catch (e) {
    const options = {
      name: 'session',
      value: '',
      maxAge: -1,
      httpOnly: true,
      secure: true,
    };

    const response = NextResponse.json({ isLogged: false }, { status: 400 });

    response.cookies.set(options);

    return response;
  }

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

export async function POST(request: NextRequest) {
  if (!auth || !adminAuth) {
    return NextResponse.json({}, { status: 500 });
  }

  const response = NextResponse.json({ isError: true }, { status: 401 });

  let loginData: ILoginData | null = null;

  try {
    loginData = (await request.json()) as ILoginData;
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ message: e.message }, { status: 400 });
    }
    return NextResponse.json(SignInErrorCodes.UnknownError, { status: 400 });
  }

  if (!loginData?.email || !loginData?.password) {
    return response;
  }

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    );
    const { user } = userCredential;
    const jwt = await user.getIdToken();

    if (!jwt) {
      return response;
    }

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

    const successResp = NextResponse.json({ isError: false }, { status: 200 });
    successResp.cookies.set(options);

    return successResp;
  } catch (e) {
    let message = '';
    let errorCode: SignInErrorCodes;

    if (e instanceof FirebaseError) {
      switch (e.code) {
        case 'auth/too-many-requests':
          errorCode = SignInErrorCodes.TooManyRequests;
          break;
        case 'auth/invalid-credential':
          errorCode = SignInErrorCodes.InvalidCredentials;
          break;
        case 'auth/network-request-failed':
          errorCode = SignInErrorCodes.AuthNetworkFailed;
          break;
        default:
          errorCode = SignInErrorCodes.AuthServiceError;
          message = `${signInPageEn[errorCode]} ${
            e.code && `Firebase error code: ${e.code}`
          }`;
      }
    } else {
      errorCode = SignInErrorCodes.UnknownError;
    }

    const errorMessage = message ? message : signInPageEn[errorCode];

    return NextResponse.json(
      { message: errorMessage, errorCode },
      { status: 401 }
    );
  }
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
