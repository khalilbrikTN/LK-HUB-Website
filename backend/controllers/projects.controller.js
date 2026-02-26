const prisma = require('../config/db');

// --- READ ALL PROJECTS ---
exports.getAllProjects = async (req, res) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' },
        });

        // Parse JSON strings back to arrays as in the original Next.js action
        const formattedProjects = projects.map(p => ({
            ...p,
            tags: JSON.parse(p.tags || '[]'),
            images: JSON.parse(p.images || '[]'),
        }));

        res.status(200).json({ success: true, data: formattedProjects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ success: false, message: 'Server Error fetching projects.' });
    }
};

// --- READ SINGLE PROJECT ---
exports.getProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await prisma.project.findUnique({ where: { id } });

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found.' });
        }

        const formattedProject = {
            ...project,
            tags: JSON.parse(project.tags || '[]'),
            images: JSON.parse(project.images || '[]'),
        };

        res.status(200).json({ success: true, data: formattedProject });
    } catch (error) {
        console.error("Error fetching project:", error);
        res.status(500).json({ success: false, message: 'Server Error fetching project.' });
    }
};

// --- CREATE PROJECT ---
exports.createProject = async (req, res) => {
    try {
        const { title, division, subtitle, description, content, icon, tags, coverImage } = req.body;

        if (!title || !description || !content) {
            return res.status(400).json({ success: false, message: 'Missing required fields.' });
        }

        // Handle array of strings or comma-separated string for tags
        let parsedTags = [];
        if (Array.isArray(tags)) parsedTags = tags;
        else if (typeof tags === 'string') parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);

        const newProject = await prisma.project.create({
            data: {
                title,
                division: division || 'General',
                subtitle: subtitle || '',
                description,
                content,
                icon: icon || '🚀',
                tags: JSON.stringify(parsedTags),
                coverImage: coverImage || '',
                images: JSON.stringify([]),
            },
        });

        res.status(201).json({ success: true, message: 'Project created successfully!', data: newProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ success: false, message: 'Failed to create project.' });
    }
};

// --- UPDATE PROJECT ---
exports.updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, division, subtitle, description, content, icon, tags, coverImage, hidden } = req.body;

        let parsedTags = tags;
        if (typeof tags === 'string') {
            parsedTags = tags.split(',').map(t => t.trim()).filter(Boolean);
        }

        const dataToUpdate = {};
        if (title !== undefined) dataToUpdate.title = title;
        if (subtitle !== undefined) dataToUpdate.subtitle = subtitle;
        if (description !== undefined) dataToUpdate.description = description;
        if (content !== undefined) dataToUpdate.content = content;
        if (tags !== undefined) dataToUpdate.tags = parsedTags ? JSON.stringify(parsedTags) : undefined;
        if (coverImage !== undefined) dataToUpdate.coverImage = coverImage;
        if (division !== undefined) dataToUpdate.division = division;
        if (icon !== undefined) dataToUpdate.icon = icon;
        if (hidden !== undefined) dataToUpdate.hidden = hidden;

        const updatedProject = await prisma.project.update({
            where: { id },
            data: dataToUpdate,
        });

        res.status(200).json({ success: true, message: 'Project updated successfully!', data: updatedProject });
    } catch (error) {
        console.error("Error updating project:", error);
        res.status(500).json({ success: false, message: 'Failed to update project.' });
    }
};

// --- DELETE PROJECT ---
exports.deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.project.delete({ where: { id } });
        res.status(200).json({ success: true, message: 'Project deleted successfully!' });
    } catch (error) {
        console.error("Error deleting project:", error);
        res.status(500).json({ success: false, message: 'Failed to delete project.' });
    }
};
