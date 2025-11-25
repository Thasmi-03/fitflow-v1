import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('fitflow_token')?.value;
    const { pathname } = request.nextUrl;

    // Public routes that don't require authentication
    const publicRoutes = ['/', '/auth/login', '/auth/register'];
    const isPublicRoute = publicRoutes.includes(pathname);

    // If accessing a public route, allow
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // Protected routes - require authentication
    const protectedPrefixes = ['/admin', '/styler', '/partner', '/auth/pending'];
    const isProtectedRoute = protectedPrefixes.some((prefix) =>
        pathname.startsWith(prefix)
    );

    if (isProtectedRoute && !token) {
        // Redirect to login if trying to access protected route without token
        const loginUrl = new URL('/auth/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public files (images, etc.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|placeholder\\.svg).*)',
    ],
};
