import { invalidateLogin } from '@/app/api/auth/invalidateLogin';
import { NextResponse } from 'next/server';

const mocks = vi.hoisted(() => {
  return {
    adminAuth: vi.fn(() => ({
      verifySessionCookie: vi.fn(() => ({ uid: 'uid' })),
      revokeRefreshTokens: vi.fn(() => false),
    })),
  };
});

vi.mock('@/lib/firebase/firebase-admin-config', () => {
  return { adminAuth: mocks.adminAuth() };
});

describe('invalidateLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return if adminAuth not present', async () => {
    mocks.adminAuth.mockReturnValueOnce(
      false as unknown as ReturnType<typeof mocks.adminAuth>
    );

    const result = await invalidateLogin('token', new NextResponse());

    expect(result).not.toBeNull();
  });
});
