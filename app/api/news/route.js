import { NextResponse } from 'next/server';
import prisma from '@/src/lib/db';

export async function GET() {
    try {
        const news = await prisma.news.findMany({
            where: { status: 'Published' },
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(news);
    } catch (error) {
        console.error('GET /api/news error:', error);
        return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
}
