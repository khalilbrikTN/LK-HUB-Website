import { NextResponse } from 'next/server';
import { updateSession } from '@/src/lib/auth'; // We might need a refresh function later, but for now we just verify

export async function middleware(request) {
    // Only intercept requests to /admin
    if (request.nextUrl.pathname.startsWith('/admin')) {

        // Allow access to the login page itself
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for session cookie
        const session = request.cookies.get('admin_session')?.value;

        // If no session, redirect to login
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // TODO: Verify JWT validity here if needed for strict security
        // For now, presence of cookie is the basic check
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
