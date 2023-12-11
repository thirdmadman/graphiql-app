import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = JSON.parse(
  process.env.SERVICE_ACCOUNT ? process.env.SERVICE_ACCOUNT : ''
);

const firebaseAdminConfig = {
  credential: cert({
    privateKey: serviceAccount?.private_key.replace(/\\n/gm, '\n'),
    clientEmail: serviceAccount?.client_email,
    projectId: serviceAccount?.project_id,
  }),
};

const app =
  getApps().length <= 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

export const adminAuth = getAuth(app);
