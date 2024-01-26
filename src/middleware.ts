import { NextRequest, NextResponse, URLPattern } from 'next/server';

export type TMiddlewareRouteHandler = (
  request: NextRequest
) => NextResponse<unknown>;
export type TMiddlewareAsyncRouteHandler = (
  request: NextRequest
) => Promise<NextResponse<unknown>>;

export interface MiddlewareRoute {
  matcher: string;
  handler: TMiddlewareRouteHandler | TMiddlewareAsyncRouteHandler;
}

export const clearCookies = (response: NextResponse) => {
  const options = {
    name: 'session',
    value: '',
    maxAge: -1,
    httpOnly: true,
    secure: true,
  };

  response.cookies.set(options);

  return response;
};

export const isAuth = async (request: NextRequest) => {
  const session = request.cookies.get('session');

  if (!session) {
    return false;
  }

  try {
    const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
      headers: {
        Cookie: `session=${session?.value}`,
      },
    });

    return responseAPI.status === 200;
  } catch {
    return false;
  }
};

export const middlewareProtectedHandler = async (request: NextRequest) => {
  const isUserAuth = await isAuth(request);

  if (!isUserAuth) {
    return clearCookies(
      NextResponse.redirect(new URL('/auth/sign-in', request.url))
    );
  }

  return NextResponse.next();
};

export const middlewareSignHandler = async (request: NextRequest) => {
  const isUserAuth = await isAuth(request);

  if (isUserAuth) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

export const routes: Array<MiddlewareRoute> = [
  { matcher: '/auth/:path*', handler: middlewareSignHandler },
  { matcher: '/editor/:path*', handler: middlewareProtectedHandler },
];

export const middlewareRequestReducer = (
  routes: Array<MiddlewareRoute>,
  request: NextRequest
) => {
  // eslint-disable-next-line @typescript-eslint/prefer-for-of
  for (let i = 0; i < routes.length; i++) {
    if (!routes[i].matcher) {
      continue;
    }

    const pattern = new URLPattern({ pathname: routes[i].matcher });

    if (!pattern) {
      continue;
    }

    const patternResult = pattern.exec(request.url);

    if (patternResult !== null && 'pathname' in patternResult) {
      return routes[i].handler(request);
    }
  }

  return NextResponse.next();
};

export async function middleware(request: NextRequest) {
  return middlewareRequestReducer(routes, request);
}
