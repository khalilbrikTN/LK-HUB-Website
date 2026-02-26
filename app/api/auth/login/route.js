import prisma from '../../../../src/lib/db';
import * as jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'lkhub-super-secret-key-123';

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body;
        if (!email || !password) return NextResponse.json({ success: false, message: 'Email and password required' }, { status: 400 });

        const user = await prisma.user.findFirst({
            where: { email, password, active: true }
        });

        if (!user) return NextResponse.json({ success: false, message: 'Invalid credentials or inactive account' }, { status: 401 });

        const token = jwt.sign({ id: user.id, role: user.role, email: user.email }, JWT_SECRET, { expiresIn: '12h' });

        return NextResponse.json({
            success: true,
            token,
            user: { id: user.id, username: user.username, role: user.role }
        }, { status: 200 });

    } catch (e) {
        console.error('Login error:', e);
        return NextResponse.json({ success: false, message: 'Internal server error.' }, { status: 500 });
    }
}
