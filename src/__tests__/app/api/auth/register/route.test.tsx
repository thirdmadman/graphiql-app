import { POST } from '@/app/api/auth/register/route';
import { NextRequest } from 'next/server';

const mocks = vi.hoisted(() => {
  return {
    adminAuth: vi.fn(() => ({
      verifySessionCookie: vi.fn(() => ({})),
      getUser: vi.fn(() => ({ user: 'uid' })),
    })),
  };
});

vi.mock('@/lib/firebase/firebase-admin-config', () => {
  return { adminAuth: mocks.adminAuth() };
});

describe('register route', () => {
  it('should return error with status 401 if register data is incorrect', async () => {
    const request = new NextRequest(
      new Request('http://localhost:3000/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: '{}',
      })
    );

    const response = await POST(request);

    expect(response.status).toBe(401);
  });
});
