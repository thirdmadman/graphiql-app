/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// app/api/users.page.ts
import { NextRequest, NextResponse } from 'next/server';

interface IResult {
  isLogged?: boolean;
  isError?: boolean;
}

const baseURL = 'http://localhost/';
const body = JSON.stringify({
  email: 'test1234@mail.ru',
  password: 'Test1234!',
});

describe('GET', () => {
  test('should return 401 if session cookie is missing', async () => {
    const { GET } = await import('@/app/api/auth/route');

    const request = new NextRequest(
      new Request(baseURL, {
        method: 'GET',
      })
    );
    const response = await GET(request);

    const result = (await response.json()) as IResult;

    expect(response.status).toBe(401);
    expect(result.isLogged).toBeFalsy();
  });

  test('should return 401 if session cookie is invalid', async () => {
    vi.doMock('@/lib/firebase/firebase-admin-config', () => ({
      adminAuth: {
        verifyIdToken: () => false,
        verifySessionCookie: () => false,
      },
    }));

    const request = new NextRequest(
      new Request(baseURL, {
        method: 'GET',
      })
    );

    request.cookies.set('session', 'session');

    const { GET } = await import('@/app/api/auth/route');

    const response = await GET(request);
    const result = (await response.json()) as IResult;

    expect(response.status).toBe(401);
    expect(result.isLogged).toBeFalsy();
  });

  test('should return 200 if session cookie is valid', async () => {
    vi.doMock('@/lib/firebase/firebase-admin-config', () => ({
      adminAuth: {
        verifySessionCookie: vi.fn(() => ({ uid: 'uid' })),
      },
    }));

    const request = new NextRequest(
      new Request(baseURL, {
        method: 'GET',
      })
    );

    request.cookies.set('session', 'session');

    const { GET } = await import('@/app/api/auth/route');

    const response = await GET(request);
    const result = (await response.json()) as IResult;

    expect(response.status).toBe(200);
    expect(result.isLogged).toBeTruthy();
  });
});

describe('POST', () => {
  it('should at least return NextResponse', async () => {
    const { POST } = await import('@/app/api/auth/route');

    const request = new NextRequest(baseURL);

    const result = await POST(request);

    expect(result instanceof NextResponse).toBeTruthy();
  });

  it('should return status code 500 in no firebase admin config', async () => {
    vi.doMock('@/lib/firebase/firebase-admin-config', () => ({
      adminAuth: undefined,
    }));

    const request = new NextRequest(baseURL);

    const { POST } = await import('@/app/api/auth/route');

    const response = await POST(request);
    const result = (await response.json()) as IResult;

    expect(result.isLogged).toBeFalsy();
    expect(response.status).toBe(500);
  });

  it('should return status code 200 if auth ok ', async () => {
    vi.doMock('@/lib/firebase/firebase-admin-config', () => ({
      adminAuth: {
        createSessionCookie: () => 'cookie',
      },
    }));

    vi.doMock('@/lib/firebase/firebase-config', () => ({
      auth: {},
    }));

    vi.doMock('firebase/auth', () => ({
      signInWithEmailAndPassword: () => ({
        user: {
          getIdToken: () => 'token',
        },
      }),
    }));

    const request = new NextRequest(
      new Request(baseURL, {
        method: 'POST',
        body,
      })
    );

    const { POST } = await import('@/app/api/auth/route');

    const response = await POST(request);

    expect(response.status).toBe(200);
  });

  it('should return error with status code 401 if no login data ', async () => {
    vi.doMock('@/lib/firebase/firebase-admin-config', () => ({
      adminAuth: {
        createSessionCookie: () => 'cookie',
      },
    }));

    vi.doMock('@/lib/firebase/firebase-config', () => ({
      auth: {},
    }));

    const request = new NextRequest(
      new Request(baseURL, {
        method: 'POST',
        body: JSON.stringify({}),
      })
    );

    const { POST } = await import('@/app/api/auth/route');

    const response = await POST(request);
    const result = (await response.json()) as IResult;

    expect(response.status).toBe(401);
    expect(result.isError).toBeTruthy();
  });

  it('should return error with status code 401 if no id token ', async () => {
    vi.doMock('@/lib/firebase/firebase-config', () => ({
      auth: {},
    }));

    vi.doMock('firebase/auth', () => ({
      signInWithEmailAndPassword: () => ({
        user: {
          getIdToken: () => null,
        },
      }),
    }));

    const request = new NextRequest(
      new Request(baseURL, {
        method: 'POST',
        body,
      })
    );

    const { POST } = await import('@/app/api/auth/route');

    const response = await POST(request);
    const result = (await response.json()) as IResult;

    expect(response.status).toBe(401);
    expect(result.isError).toBeTruthy();
  });
});

describe('DELETE', () => {
  test('should return 500 if no firebase admin config', async () => {
    vi.doMock('@/lib/firebase/firebase-admin-config', () => ({
      adminAuth: undefined,
    }));

    const request = new NextRequest(new Request(baseURL));

    const { DELETE } = await import('@/app/api/auth/route');

    const response = await DELETE(request);

    expect(response.status).toBe(500);
  });
  test('should return 500 if no auth', async () => {
    vi.doMock('@/lib/firebase/firebase-config', () => ({
      auth: undefined,
    }));

    const request = new NextRequest(new Request(baseURL));

    const { DELETE } = await import('@/app/api/auth/route');

    const response = await DELETE(request);

    expect(response.status).toBe(500);
  });
  test('should return 401 if no token', async () => {
    vi.doMock('@/lib/firebase/firebase-admin-config', () => ({
      adminAuth: {},
    }));

    vi.doMock('@/lib/firebase/firebase-config', () => ({
      auth: {},
    }));

    const request = new NextRequest(new Request(baseURL));

    const { DELETE } = await import('@/app/api/auth/route');

    const response = await DELETE(request);
    const result = (await response.json()) as IResult;

    expect(result.isLogged).toBeFalsy();
    expect(response.status).toBe(401);
  });

  test('should return 200 if token exists', async () => {
    vi.doMock('@/lib/firebase/firebase-admin-config', () => ({
      adminAuth: {
        verifySessionCookie: vi.fn(() => ({ uid: 'uid' })),
        revokeRefreshTokens: vi.fn(() => false),
      },
    }));

    vi.doMock('@/lib/firebase/firebase-config', () => ({
      auth: {},
    }));

    const { DELETE } = await import('@/app/api/auth/route');

    const request = new NextRequest(new Request(baseURL));
    request.cookies.set('session', 'session');
    const response = await DELETE(request);

    expect(response.status).toBe(200);
  });
});
