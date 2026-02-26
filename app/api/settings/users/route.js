import prisma from '../../../../src/lib/db';
import { NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'lkhub-super-secret-key-123';

function authenticate(req) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    try {
        jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function GET(req) {
    if (!authenticate(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                active: true,
                createdAt: true,
                updatedAt: true,
            }
        });
        return NextResponse.json({ success: true, data: users }, { status: 200 });
    } catch (error) {
        console.error("Error reading users:", error);
        return NextResponse.json({ success: false, message: 'Server Error fetching users.' }, { status: 500 });
    }
}

export async function POST(req) {
    if (!authenticate(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    try {
        const { username, email, password } = await req.json();

        if (!email || !password || !username) {
            return NextResponse.json({ success: false, message: 'Missing required user fields.' }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ success: false, message: 'Email already registered.' }, { status: 400 });
        }

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password,
                role: 'Admin',
                active: true,
            },
            select: {
                id: true,
                username: true,
                email: true,
                role: true,
                createdAt: true,
            }
        });
        return NextResponse.json({ success: true, message: 'User created successfully!', data: newUser }, { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ success: false, message: 'Failed to create user.' }, { status: 500 });
    }
}
