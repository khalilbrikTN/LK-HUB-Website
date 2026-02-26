import prisma from '../../../src/lib/db';
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

export async function GET() {
    try {
        const items = await prisma.news.findMany({ orderBy: { date: 'desc' } });
        return NextResponse.json({ success: true, data: items }, { status: 200 });
    } catch (error) {
        console.error('GET News Error:', error);
        return NextResponse.json({ success: false, message: 'Server error fetching news' }, { status: 500 });
    }
}

export async function POST(req) {
    if (!authenticate(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const nw = await prisma.news.create({ data });
        return NextResponse.json({ success: true, data: nw }, { status: 201 });
    } catch (error) {
        console.error('POST News Error:', error);
        return NextResponse.json({ success: false, message: 'Server error creating news' }, { status: 500 });
    }
}
