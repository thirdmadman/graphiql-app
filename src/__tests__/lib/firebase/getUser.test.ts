import { getUser } from '@/lib/firebase/getUser';

const mocks = vi.hoisted(() => {
  return {
    cookies: vi.fn(() => ({
      get: (arg: string) => ({ value: arg }),
    })),
    adminAuth: vi.fn(() => ({
      verifySessionCookie: vi.fn(() => ({ uid: 'uid' })),
    })),
  };
});

describe('getUser', () => {
  vi.mock('next/headers', () => {
    return {
      cookies: mocks.cookies,
    };
  });

  vi.mock('@/lib/firebase/firebase-admin-config', () => {
    return { adminAuth: mocks.adminAuth() };
  });

  it('should return null if no session present', async () => {
    mocks.cookies.mockReturnValueOnce({
      get: () => ({}),
    } as unknown as ReturnType<typeof mocks.cookies>);

    const result = await getUser();

    expect(result).toBe(null);
  });

  it('should return user if session present', async () => {
    const result = await getUser();

    expect(result).toStrictEqual({
      uid: 'uid',
    });
  });
});
