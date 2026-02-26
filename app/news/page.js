import NewsClient from './NewsClient';
import { getNews } from '@/app/actions/news';

export const metadata = {
    title: 'News | LK-HUB',
    description: 'Stay up to date with the latest news and updates from LK-HUB.',
};

export default async function NewsPage() {
    const allNews = await getNews();
    const published = allNews.filter(n => n.status === 'Published');
    return <NewsClient newsItems={published} />;
}
