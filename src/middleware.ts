import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodedUser } from './utils/decodeUser';

export default function middleware(request: NextRequest) {
      const token = request.cookies.get('accessToken')?.value;

      if (!token) {
            return NextResponse.redirect(new URL('/', request.url));
      }

      try {
            const user: any = decodedUser(token as string);

            if (!user || !user.role) {
                  return NextResponse.redirect(new URL('/', request.url));
            }

            const { pathname } = request.nextUrl;

            // Role-based route protection
            if (user.role === 'MENTEE' && pathname.startsWith('/dashboard/mentor')) {
                  return NextResponse.redirect(new URL('/dashboard/mentee', pathname));
            }

            if (user.role === 'MENTOR' && pathname.startsWith('/dashboard/mentee')) {
                  return NextResponse.redirect(new URL('/dashboard/mentor', pathname));
            }

            return NextResponse.next();
      } catch (error) {
            console.error('Error decoding token:', error);
            return NextResponse.redirect(new URL('/', request.url));
      }
}

export const config = {
      matcher: ['/dashboard/:path*'],
};
