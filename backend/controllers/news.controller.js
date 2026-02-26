const prisma = require('../config/db');

// --- READ ALL NEWS ---
exports.getAllNews = async (req, res) => {
    try {
        const news = await prisma.news.findMany({
            orderBy: { createdAt: 'desc' },
        });
        res.status(200).json({ success: true, data: news });
    } catch (error) {
        console.error("Error reading news:", error);
        res.status(500).json({ success: false, message: 'Server Error fetching news.' });
    }
};

// --- CREATE NEWS ---
exports.createNews = async (req, res) => {
    try {
        const { title, date, category, status, content, image } = req.body;

        if (!title) {
            return res.status(400).json({ success: false, message: 'News title is required.' });
        }

        const newArticle = await prisma.news.create({
            data: {
                title,
                date: date || new Date().toISOString().split('T')[0],
                category: category || 'General',
                status: status || 'Draft',
                content: content || '',
                image: image || '',
            },
        });

        res.status(201).json({ success: true, message: 'News created successfully!', data: newArticle });
    } catch (error) {
        console.error("Error creating news:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- UPDATE NEWS ---
exports.updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date, category, status, content, image } = req.body;

        const updatedArticle = await prisma.news.update({
            where: { id },
            data: {
                title,
                date,
                category,
                status,
                content,
                image,
            },
        });

        res.status(200).json({ success: true, message: 'News updated successfully!', data: updatedArticle });
    } catch (error) {
        console.error("Error updating news:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// --- TOGGLE VISIBILITY ---
exports.toggleNewsVisibility = async (req, res) => {
    try {
        const { id } = req.params;
        const { hidden } = req.body;

        // Using status as proxy since MySQL schema doesn't have a specific `hidden` column
        const updatedArticle = await prisma.news.update({
            where: { id },
            data: { status: hidden ? 'Hidden' : 'Published' },
        });

        res.status(200).json({ success: true, message: `News visibility set to ${updatedArticle.status}.` });
    } catch (error) {
        console.error("Error toggling news visibility:", error);
        res.status(500).json({ success: false, message: 'Failed to update visibility.' });
    }
};

// --- DELETE NEWS ---
exports.deleteNews = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.news.delete({ where: { id } });
        res.status(200).json({ success: true, message: 'News deleted successfully!' });
    } catch (error) {
        console.error("Error deleting news:", error);
        res.status(500).json({ success: false, message: 'Failed to delete news.' });
    }
};
