import { NextRequest, NextResponse } from 'next/server';

describe('auth with google', () => {
  it('should at least return NextResponse', async () => {
    vi.doMock('@/lib/firebase/firebaseAdminConfig', () => ({
      adminAuth: undefined,
    }));

    const { POST } = await import('@/app/api/auth/google/route');

    const req = new NextRequest('http://localhost');

    const result = await POST(req);

    expect(result instanceof NextResponse).toBeTruthy();
  });

  it('should return status code 500 in no firebase admin config', async () => {
    vi.doMock('@/lib/firebase/firebaseAdminConfig', () => ({
      adminAuth: undefined,
    }));

    const { POST } = await import('@/app/api/auth/google/route');

    const req = new NextRequest('http://localhost');

    const result = await POST(req);

    expect(result.status).toBe(500);
  });

  it('should return status code 401 if no Authorization token provided', async () => {
    vi.doMock('@/lib/firebase/firebaseAdminConfig', () => ({
      adminAuth: {},
    }));

    const { POST } = await import('@/app/api/auth/google/route');

    const req = new NextRequest('http://localhost');
    req.headers.set('Authorization', 'google');

    const result = await POST(req);

    expect(result.status).toBe(401);
  });

  it('should return status code 401 if Authorization not verified', async () => {
    vi.doMock('@/lib/firebase/firebaseAdminConfig', () => ({
      adminAuth: {
        verifyIdToken: () => false,
      },
    }));

    const { POST } = await import('@/app/api/auth/google/route');

    const req = new NextRequest('http://localhost');
    req.headers.set('Authorization', 'Bearer token');

    const result = await POST(req);

    expect(result.status).toBe(401);
  });

  it('should return status code 200 if auth ok', async () => {
    vi.doMock('@/lib/firebase/firebaseAdminConfig', () => ({
      adminAuth: {
        verifyIdToken: () => true,
        createSessionCookie: () => 'createSessionCookie',
      },
    }));

    const { POST } = await import('@/app/api/auth/google/route');

    const req = new NextRequest('http://localhost');
    req.headers.set('Authorization', 'Bearer token');

    const result = await POST(req);

    expect(result.status).toBe(200);
  });
});
