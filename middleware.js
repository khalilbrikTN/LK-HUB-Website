import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.PAYLOAD_SECRET || 'fallback-secret-key-change-this');

export async function middleware(request) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        const session = request.cookies.get('admin_session')?.value;

        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        try {
            await jwtVerify(session, secretKey, { algorithms: ['HS256'] });
        } catch (error) {
            // Token is invalid/expired, redirect to login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin', '/admin/:path*'],
};
