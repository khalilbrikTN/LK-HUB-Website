import NewsClient from './NewsClient';
import prisma from '@/src/lib/db';

export const dynamic = 'force-dynamic';

export const metadata = {
    title: 'News | LK-HUB',
    description: 'Stay up to date with the latest news and updates from LK-HUB.',
};

export default async function NewsPage() {
    const dbNewsRaw = await prisma.news.findMany({
        orderBy: { createdAt: 'desc' },
        where: { status: 'Published' }
    });

    const parsedNews = dbNewsRaw.map(n => ({
        ...n,
        createdAt: n.createdAt ? n.createdAt.toISOString() : null,
        updatedAt: n.updatedAt ? n.updatedAt.toISOString() : null,
    }));

    return <NewsClient newsItems={parsedNews} />;
}
