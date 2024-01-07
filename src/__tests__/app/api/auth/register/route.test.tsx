import { POST } from '@/app/api/auth/register/route';
import { NextRequest } from 'next/server';

const body = JSON.stringify({
  name: 'test',
  email: 'test@test.com',
  password: 'test123!',
});

const mocks = vi.hoisted(() => {
  return {
    adminAuth: vi.fn(() => ({
      createUser: vi.fn(() => ({ user: 'uid' })),
    })),
  };
});

vi.mock('@/lib/firebase/firebase-admin-config', () => {
  return { adminAuth: mocks.adminAuth() };
});

describe('register route', () => {
  it('should return error with status 401 if user data is incorrect', async () => {
    const request = new NextRequest(
      new Request('http://localhost:3000/', {
        method: 'POST',
        body: '{}',
      })
    );

    const response = await POST(request);

    expect(response.status).toBe(401);
  });

  it('should return response with status 200 if user is created', async () => {
    const request = new NextRequest(
      new Request('http://localhost:3000/', {
        method: 'POST',
        body,
      })
    );

    const response = await POST(request);

    expect(response.status).toBe(200);
  });
});
