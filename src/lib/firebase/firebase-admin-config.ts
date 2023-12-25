import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const getAdminAuth = () => {
  try {
    const SERVICE_ACCOUNT = process.env.SERVICE_ACCOUNT
      ? process.env.SERVICE_ACCOUNT
      : '';

    if (!SERVICE_ACCOUNT || SERVICE_ACCOUNT.length <= 0) {
      return null;
    }

    const serviceAccount = JSON.parse(SERVICE_ACCOUNT) as {
      private_key: string;
      client_email: string;
      project_id: string;
    };

    const firebaseAdminConfig = {
      credential: cert({
        privateKey: serviceAccount.private_key.replace(/\\n/gm, '\n'),
        clientEmail: serviceAccount.client_email,
        projectId: serviceAccount.project_id,
      }),
    };

    const app =
      getApps().length <= 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

    return getAuth(app);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const adminAuth = getAdminAuth();
