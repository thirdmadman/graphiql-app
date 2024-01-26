import { adminAuth } from '@/lib/firebase/firebaseAdminConfig';
import { NextResponse } from 'next/server';

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
