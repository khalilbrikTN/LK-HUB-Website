"use server";
import prisma from '@/src/lib/db';

// --- READ PROJECTS ---
export async function getProjects() {
    try {
        const projects = await prisma.project.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return projects.map(p => ({
            ...p,
            tags: JSON.parse(p.tags || '[]'),
            images: JSON.parse(p.images || '[]'),
        }));
    } catch (error) {
        console.error("Error reading projects:", error);
        return [];
    }
}

// --- GET SINGLE PROJECT ---
export async function getProjectById(id) {
    try {
        const p = await prisma.project.findUnique({ where: { id } });
        if (!p) return null;
        return {
            ...p,
            tags: JSON.parse(p.tags || '[]'),
            images: JSON.parse(p.images || '[]'),
        };
    } catch (error) {
        console.error("Error reading project:", error);
        return null;
    }
}

// --- CREATE PROJECT ---
export async function createProject(formData) {
    try {
        const tags = formData.get('tags')?.split(',').map(t => t.trim()).filter(Boolean) || [];
        await prisma.project.create({
            data: {
                division: formData.get('division') || 'General',
                title: formData.get('title'),
                subtitle: formData.get('subtitle') || '',
                description: formData.get('description'),
                content: formData.get('content'),
                icon: formData.get('icon') || '🚀',
                tags: JSON.stringify(tags),
                coverImage: formData.get('coverImage') || '',
                images: JSON.stringify([]),
            }
        });
        return { success: true, message: "Project created successfully!" };
    } catch (error) {
        console.error("Error creating project:", error);
        return { success: false, message: "Failed to create project." };
    }
}

// --- UPDATE PROJECT ---
export async function updateProject(id, currentData, formData) {
    try {
        const tags = formData.get('tags')?.split(',').map(t => t.trim()).filter(Boolean);
        await prisma.project.update({
            where: { id },
            data: {
                title: formData.get('title'),
                subtitle: formData.get('subtitle') || '',
                description: formData.get('description'),
                content: formData.get('content'),
                tags: tags ? JSON.stringify(tags) : undefined,
                coverImage: formData.get('coverImage'),
                division: formData.get('division'),
                icon: formData.get('icon'),
            }
        });
        return { success: true, message: "Project updated successfully!" };
    } catch (error) {
        console.error("Error updating project:", error);
        return { success: false, message: "Failed to update project." };
    }
}

// --- DELETE PROJECT ---
export async function deleteProject(id) {
    try {
        await prisma.project.delete({ where: { id } });
        return { success: true, message: "Project deleted successfully!" };
    } catch (error) {
        console.error("Error deleting project:", error);
        return { success: false, message: "Failed to delete project." };
    }
}
