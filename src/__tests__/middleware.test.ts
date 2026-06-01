import { NextRequest } from 'next/server';

const fetchMock = vi.fn(() => ({
  json: () => ({}),
  status: 200,
}));

const urlPatternExecMock = vi.fn();

vi.mock('next/server', async () => {
  const actual =
    await vi.importActual<typeof import('next/server')>('next/server');

  class MockURLPattern {
    exec = urlPatternExecMock;
  }

  return {
    ...actual,
    URLPattern: MockURLPattern,
  };
});

import { isAuth, middleware } from '@/middleware';

vi.stubGlobal('fetch', fetchMock);

describe('middleware', () => {
  it('should return false if no cookies in request', async () => {
    const request = new NextRequest('http://localhost/');

    const result = await isAuth(request);

    expect(result).toBe(false);
  });

  it('should return false on req error', async () => {
    const request = new NextRequest('http://localhost/');
    request.cookies.set('session', 'session');

    fetchMock.mockRejectedValueOnce({});

    const result = await isAuth(request);

    expect(result).toBe(false);
  });

  it('should run and not fail', async () => {
    const request = new NextRequest('http://localhost/');
    request.cookies.set('session', 'session');

    urlPatternExecMock.mockReturnValueOnce({ pathname: 'pathname' });

    const result = await middleware(request);

    expect(result.redirected).toBe(false);
  });
});
