import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

//Protected routes
export const config = {
  matcher: ['/app/:path*'],
};

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const responseAPI = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
