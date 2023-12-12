import { adminAuth } from '@/lib/firebase/firebase-admin-config';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ isError: true }, { status: 401 });

  type TRegisterData = {
    email: string;
    password: string;
  };

  const registerData = (await request.json()) as TRegisterData;

  if (registerData && registerData.email && registerData.password) {
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
