import { NextResponse } from 'next/server';
import prisma from '@/src/lib/db';

export async function GET() {
    try {
        const careers = await prisma.career.findMany({
            where: { status: 'Active' },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(careers);
    } catch (error) {
        console.error('GET /api/careers error:', error);
        return NextResponse.json({ error: 'Failed to fetch careers' }, { status: 500 });
    }
}
