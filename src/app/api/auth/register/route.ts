import { adminAuth } from '@/lib/firebase/firebase-admin-config';
import type { FirebaseAuthError } from 'firebase-admin/lib/utils/error';
import { FirebaseError } from 'firebase/app';
import { NextRequest, NextResponse } from 'next/server';

interface IRegisterData {
  name: string;
  email: string;
  password: string;
}

function isFirebaseAuthError(error: FirebaseError): error is FirebaseAuthError {
  return error.code.startsWith('auth/');
}

export async function POST(request: NextRequest) {
  if (!adminAuth) {
    return NextResponse.json({}, { status: 500 });
  }

  const response = NextResponse.json({ isError: true }, { status: 401 });

  const registerData = (await request.json()) as IRegisterData;

  if (registerData.name && registerData.email && registerData.password) {
    try {
      const user = await adminAuth.createUser({
        email: registerData.email,
        emailVerified: true,
        password: registerData.password,
        displayName: registerData.name,
        disabled: false,
      });

      return NextResponse.json({ isError: false, user }, { status: 200 });
    } catch (e) {
      let message = '';
      let errorCode = '';
      if (isFirebaseAuthError) {
        switch (e.code) {
          case 'auth/too-many-requests':
            message =
              'Too many requests. Access to this account has been temporarily disabled due to many failed login attempts. Please try again later.';
            errorCode = 'TooManyRequestsError';
            break;
          case 'auth/email-already-exists':
            message =
              'The provided email is already in use by an existing user';
            errorCode = 'EmailAlreadyExistsError';
            break;
          default:
            message = `Authorization service error. ${
              e.code && `(Firebase error code: ${e.code})`
            }`;
            errorCode = 'AuthServiseError';
        }
      } else {
        message = 'An error occurred, please try again later.';
        errorCode = 'UnknownError';
      }
      return NextResponse.json({ message, errorCode }, { status: 401 });
    }
  }

  return response;
}
