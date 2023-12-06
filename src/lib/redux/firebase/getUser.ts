import {cookies} from 'next/headers';
import {adminAuth} from './firebase-admin-config';

export default async function getUser() {
  const session = cookies().get('session')?.value;
  if (!session) {
    return null;
  }
  const user = await adminAuth.verifySessionCookie(session, true);
  return user;
}
