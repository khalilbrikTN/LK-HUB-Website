"use server";
import fs from 'fs';
import path from 'path';

const NEWS_FILE = path.join(process.cwd(), 'src', 'data', 'news.json');

export async function getNews() {
    try {
        if (!fs.existsSync(NEWS_FILE)) return [];
        const fileContent = fs.readFileSync(NEWS_FILE, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading news:", error);
        return [];
    }
}

export async function deleteNews(id) {
    try {
        const news = await getNews();
        const filtered = news.filter(n => n.id !== id);

        fs.writeFileSync(NEWS_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
        return { success: true, message: "News deleted successfully!" };
    } catch (error) {
        return { success: false, message: "Failed to delete news." };
    }
}
// Create/Update would be similar if we build the form pages.
// I will add them quickly just in case.
export async function createNews(formData) {
    try {
        const news = await getNews();
        const newItem = {
            id: `news-${Date.now()}`,
            title: formData.get('title'),
            date: formData.get('date'),
            category: formData.get('category'),
            status: formData.get('status') || 'Draft',
            content: formData.get('content'),
            excerpt: formData.get('excerpt'),
            author: formData.get('author'),
            isFeatured: formData.get('isFeatured') === 'true',
            image: formData.get('image'),
            hidden: false,
            createdAt: new Date().toISOString()
        };
        news.push(newItem);
        fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), 'utf-8');
        return { success: true };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

export async function updateNews(id, formData) {
    try {
        const news = await getNews();
        const index = news.findIndex(n => n.id === id);
        if (index === -1) return { success: false, message: "News not found" };

        news[index] = {
            ...news[index],
            title: formData.get('title'),
            date: formData.get('date'),
            category: formData.get('category'),
            status: formData.get('status'),
            content: formData.get('content'),
            excerpt: formData.get('excerpt'),
            author: formData.get('author'),
            isFeatured: formData.get('isFeatured') === 'true',
            image: formData.get('image'),
            updatedAt: new Date().toISOString()
        };

        fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), 'utf-8');
        return { success: true };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

export async function toggleNewsVisibility(id, hidden) {
    try {
        const news = await getNews();
        const index = news.findIndex(n => n.id === id);
        if (index === -1) return { success: false };

        news[index].hidden = hidden;
        fs.writeFileSync(NEWS_FILE, JSON.stringify(news, null, 2), 'utf-8');
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}
