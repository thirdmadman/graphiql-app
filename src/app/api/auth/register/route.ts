import { adminAuth } from '@/lib/firebase/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

interface IRegisterData {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  if (!adminAuth) {
    return NextResponse.json({}, { status: 500 });
  }

  const response = NextResponse.json({ isError: true }, { status: 401 });

  const registerData = (await request.json()) as IRegisterData;

  if (registerData?.email && registerData.password) {
    try {
      const user = await adminAuth.createUser({
        email: registerData.email,
        emailVerified: true,
        password: registerData.password,
        displayName: registerData.email,
        disabled: false,
      });

      return NextResponse.json({ isError: false, user }, { status: 200 });
    } catch (error) {
      console.error(error);
    }
  }
  return response;
}
