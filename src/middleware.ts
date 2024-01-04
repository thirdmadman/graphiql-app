import { NextRequest, NextResponse, URLPattern } from 'next/server';

type TMiddlewareRouteHandler = (request: NextRequest) => NextResponse<unknown>;
type TMiddlewareAsyncRouteHandler = (
  request: NextRequest
) => Promise<NextResponse<unknown>>;

interface MiddlewareRoute {
  matcher: string;
  handler: TMiddlewareRouteHandler | TMiddlewareAsyncRouteHandler;
}

const isAuth = async (request: NextRequest) => {
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

const middlewareProtectedHandler = async (request: NextRequest) => {
  const isUserAuth = await isAuth(request);

  if (!isUserAuth) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }

  return NextResponse.next();
};

const middlewareSignHandler = async (request: NextRequest) => {
  const isUserAuth = await isAuth(request);

  if (isUserAuth) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
};

const routes: Array<MiddlewareRoute> = [
  { matcher: '/auth/:path*', handler: middlewareSignHandler },
  { matcher: '/protected/:path*', handler: middlewareProtectedHandler },
];

const middlewareRequestReducer = (
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
