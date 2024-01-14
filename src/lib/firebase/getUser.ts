import { cookies } from 'next/headers';
import { adminAuth } from './firebase-admin-config';

export async function getUser() {
  const session = cookies().get('session')?.value;
  if (!session || !adminAuth) {
    return null;
  }

  try {
    return await adminAuth.verifySessionCookie(session, true);
  } catch {
    return null;
  }
}
