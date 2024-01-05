import { adminAuth } from '@/lib/firebase/firebase-admin-config';
import { SignUpErrorCodes } from '@/locales/locale';
import type { FirebaseAuthError } from '../../../../../node_modules/firebase-admin/lib/utils/error';
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
      const err = e as FirebaseAuthError;
      if (isFirebaseAuthError(err)) {
        switch (err.code) {
          case 'auth/email-already-exists':
            message =
              'The provided email is already in use by an existing user';
            errorCode = SignUpErrorCodes.EmailAlreadyExists;
            break;
          case 'auth/invalid-email':
            message = 'The provided email address is invalid';
            errorCode = SignUpErrorCodes.AuthInvalidEmailError;
            break;
          default:
            message = `Authorization service error. ${
              err.code && `(Firebase error code: ${err.code})`
            }`;
            errorCode = SignUpErrorCodes.AuthServiceError;
        }
      } else {
        message = 'An error occurred, please try again later.';
        errorCode = SignUpErrorCodes.UnknownError;
      }
      return NextResponse.json({ message, errorCode }, { status: 401 });
    }
  }

  return response;
}
