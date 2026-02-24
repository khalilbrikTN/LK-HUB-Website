"use server";
import prisma from '@/src/lib/db';

export async function getNews() {
    try {
        const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } });
        return news;
    } catch (error) {
        console.error("Error reading news:", error);
        return [];
    }
}

export async function deleteNews(id) {
    try {
        await prisma.news.delete({ where: { id } });
        return { success: true, message: "News deleted successfully!" };
    } catch (error) {
        return { success: false, message: "Failed to delete news." };
    }
}

export async function createNews(formData) {
    try {
        await prisma.news.create({
            data: {
                title: formData.get('title'),
                date: formData.get('date') || new Date().toISOString().split('T')[0],
                category: formData.get('category') || 'General',
                status: formData.get('status') || 'Draft',
                content: formData.get('content') || '',
                image: formData.get('image') || '',
            }
        });
        return { success: true };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

export async function updateNews(id, formData) {
    try {
        await prisma.news.update({
            where: { id },
            data: {
                title: formData.get('title'),
                date: formData.get('date'),
                category: formData.get('category'),
                status: formData.get('status'),
                content: formData.get('content'),
                image: formData.get('image'),
            }
        });
        return { success: true };
    } catch (e) {
        return { success: false, message: e.message };
    }
}

export async function toggleNewsVisibility(id, hidden) {
    // MySQL schema doesn't have hidden; use status as proxy
    try {
        await prisma.news.update({
            where: { id },
            data: { status: hidden ? 'Hidden' : 'Published' }
        });
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}
