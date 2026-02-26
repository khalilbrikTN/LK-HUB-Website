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

export async function PUT(req, { params }) {
    if (!authenticate(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    try {
        const data = await req.json();
        const nw = await prisma.news.update({ where: { id }, data });
        return NextResponse.json({ success: true, data: nw }, { status: 200 });
    } catch (error) {
        console.error('PUT News Error:', error);
        return NextResponse.json({ success: false, message: 'Server error updating news' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    if (!authenticate(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    try {
        await prisma.news.delete({ where: { id } });
        return NextResponse.json({ success: true, message: 'Deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('DELETE News Error:', error);
        return NextResponse.json({ success: false, message: 'Server error deleting news' }, { status: 500 });
    }
}
