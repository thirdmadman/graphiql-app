import { NextRequest, NextResponse } from 'next/server';

//Protected routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

export function middleware(request: NextRequest) {
  try {
    const session = request.cookies.get('session');

    if (session) {
      if (
        request.nextUrl.pathname.includes('sign-up') ||
        request.nextUrl.pathname.includes('sign-in')
      ) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    }

    if (!session && request.url === `${request.nextUrl.origin}/`) {
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }

    return NextResponse.next();
  } catch (e) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }
}
