import { getAdminAuth } from '@/lib/firebase/firebase-admin-config';

describe('getAdminAuth', () => {
  it('should return null if no SERVICE_ACCOUNT provided', () => {
    vi.stubEnv('SERVICE_ACCOUNT', '');

    const result = getAdminAuth();

    expect(result).toBeNull();
  });

  it('should return null if no SERVICE_ACCOUNT not valid json', () => {
    vi.stubEnv('SERVICE_ACCOUNT', '{');

    const result = getAdminAuth();

    expect(result).toBeNull();
  });
});
