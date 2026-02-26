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
        const items = await prisma.career.findMany({ orderBy: { createdAt: 'desc' } });
        const itemsFormatted = items.map(c => ({
            ...c,
            requirements: JSON.parse(c.requirements || '[]'),
            benefits: JSON.parse(c.benefits || '[]')
        }));
        return NextResponse.json({ success: true, data: itemsFormatted }, { status: 200 });
    } catch (error) {
        console.error('GET Careers Error:', error);
        return NextResponse.json({ success: false, message: 'Server error fetching careers' }, { status: 500 });
    }
}

export async function POST(req) {
    if (!authenticate(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const cr = await prisma.career.create({
            data: {
                ...data,
                requirements: typeof data.requirements === 'string' ? data.requirements : JSON.stringify(data.requirements || []),
                benefits: typeof data.benefits === 'string' ? data.benefits : JSON.stringify(data.benefits || [])
            }
        });
        return NextResponse.json({ success: true, data: cr }, { status: 201 });
    } catch (error) {
        console.error('POST Careers Error:', error);
        return NextResponse.json({ success: false, message: 'Server error creating career' }, { status: 500 });
    }
}
