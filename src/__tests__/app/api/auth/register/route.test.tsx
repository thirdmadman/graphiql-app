import { NextRequest } from 'next/server';

const body = JSON.stringify({
  name: 'test',
  email: 'test@test.com',
  password: 'test123!',
});

describe('register route', () => {
  it('should return error with status 401 if user data is incorrect', async () => {
    vi.doMock('@/lib/firebase/firebaseAdminConfig', () => ({
      adminAuth: {},
    }));

    const { POST } = await import('@/app/api/auth/register/route');

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
    vi.doMock('@/lib/firebase/firebaseAdminConfig', () => ({
      adminAuth: {
        createUser: () => ({ user: 'uid' }),
      },
    }));

    const { POST } = await import('@/app/api/auth/register/route');

    const request = new NextRequest(
      new Request('http://localhost:3000/', {
        method: 'POST',
        body,
      })
    );

    const response = await POST(request);

    expect(response.status).toBe(200);
  });

  it('should return response with status 401 if it was en error while user creating', async () => {
    vi.doMock('@/lib/firebase/firebaseAdminConfig', () => ({
      adminAuth: {
        createUser: null,
      },
    }));

    const { POST } = await import('@/app/api/auth/register/route');

    const request = new NextRequest(
      new Request('http://localhost:3000/', {
        method: 'POST',
        body,
      })
    );

    const response = await POST(request);

    expect(response.status).toBe(401);
  });

  it('should return error with status 500 if adminAuth not present', async () => {
    vi.doMock('@/lib/firebase/firebaseAdminConfig', () => ({
      adminAuth: null,
    }));

    const { POST } = await import('@/app/api/auth/register/route');

    const request = new NextRequest(
      new Request('http://localhost:3000/', {
        method: 'POST',
        body: '{}',
      })
    );

    const response = await POST(request);

    expect(response.status).toBe(500);
  });

  it('should return error resp with code 401 if any FirebaseAuthError thrown', async () => {
    vi.doMock('@/lib/firebase/firebaseAdminConfig', () => ({
      adminAuth: {},
      createUser: () => {
        throw new Error();
      },
    }));

    const { POST } = await import('@/app/api/auth/register/route');

    const request = new NextRequest(
      new Request('http://localhost:3000/', {
        method: 'POST',
        body: '{}',
      })
    );

    const response = await POST(request);

    expect(response.status).toBe(401);
  });
});
