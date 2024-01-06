import { getFirebaseConfig } from '@/lib/firebase/firebase-config';

describe('getFirebaseConfig', () => {
  beforeEach(() => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_API_KEY', 'NEXT_PUBLIC_FIREBASE_API_KEY');
    vi.stubEnv(
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN'
    );
    vi.stubEnv(
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID'
    );
    vi.stubEnv(
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
      'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET'
    );
    vi.stubEnv(
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID'
    );
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_APP_ID', 'NEXT_PUBLIC_FIREBASE_APP_ID');
    vi.stubEnv(
      'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
      'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID'
    );
  });

  it('should return all null if API_KEY not present ', () => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_API_KEY', '');

    const result = getFirebaseConfig();

    expect(result).toStrictEqual({
      app: null,
      auth: null,
      db: null,
      provider: null,
    });
  });

  it('should return all null if AUTH_DOMAIN not present ', () => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', '');

    const result = getFirebaseConfig();

    expect(result).toStrictEqual({
      app: null,
      auth: null,
      db: null,
      provider: null,
    });
  });

  it('should return all null if PROJECT_ID not present ', () => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_PROJECT_ID', '');

    const result = getFirebaseConfig();

    expect(result).toStrictEqual({
      app: null,
      auth: null,
      db: null,
      provider: null,
    });
  });

  it('should return all null if STORAGE_BUCKET not present ', () => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET', '');

    const result = getFirebaseConfig();

    expect(result).toStrictEqual({
      app: null,
      auth: null,
      db: null,
      provider: null,
    });
  });

  it('should return all null if MESSAGING_SENDER_ID not present ', () => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID', '');

    const result = getFirebaseConfig();

    expect(result).toStrictEqual({
      app: null,
      auth: null,
      db: null,
      provider: null,
    });
  });

  it('should return all null if APP_ID not present ', () => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_APP_ID', '');

    const result = getFirebaseConfig();

    expect(result).toStrictEqual({
      app: null,
      auth: null,
      db: null,
      provider: null,
    });
  });

  it('should return all null if MEASUREMENT_ID not present ', () => {
    vi.stubEnv('NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID', '');

    const result = getFirebaseConfig();

    expect(result).toStrictEqual({
      app: null,
      auth: null,
      db: null,
      provider: null,
    });
  });

  it('should return correctly firebase libs', () => {
    const result = getFirebaseConfig();

    expect(result.app).not.toBeNull();
    expect(result.auth).not.toBeNull();
    expect(result.db).not.toBeNull();
    expect(result.provider).not.toBeNull();
  });
});
