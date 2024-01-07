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
      createUser: null,
    })),
  };
});

vi.mock('@/lib/firebase/firebase-admin-config', () => {
  return { adminAuth: mocks.adminAuth() };
});

describe('register route', () => {
  it('should return response with status 401 if it was en error while user creating', async () => {
    const request = new NextRequest(
      new Request('http://localhost:3000/', {
        method: 'POST',
        body,
      })
    );

    let response;

    try {
      response = await POST(request);
    } catch (e) {}

    expect(response?.status).toBe(401);
  });
});
