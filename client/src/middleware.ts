// src/middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get token from cookies or localStorage
  const token =
    request.cookies.get('auth_token')?.value ||
    request.headers.get('Authorization')?.split(' ')[1];

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth');
  const isApiRequest = request.nextUrl.pathname.startsWith('/api');

  // Don't protect API routes - they handle their own auth
  if (isApiRequest) {
    return NextResponse.next();
  }

  // If trying to access auth pages while logged in, redirect to dashboard
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If trying to access protected pages while logged out, redirect to login
  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*'],
};
