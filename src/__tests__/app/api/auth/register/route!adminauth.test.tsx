import { POST } from '@/app/api/auth/register/route';
import { NextRequest } from 'next/server';

vi.mock('@/lib/firebase/firebase-admin-config', () => {
  return { adminAuth: null };
});

describe('register route', () => {
  it('should return error with status 500 if adminAuth not present', async () => {
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

    expect(response.status).toBe(500);
  });
});
