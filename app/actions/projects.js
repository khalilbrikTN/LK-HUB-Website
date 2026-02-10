"use server";
import fs from 'fs';
import path from 'path';

// Define the absolute path to the data file
const PROJECTS_FILE = path.join(process.cwd(), 'src', 'data', 'projects.json');

// --- READ PROJECTS ---
export async function getProjects() {
    try {
        if (!fs.existsSync(PROJECTS_FILE)) {
            // Return empty array if file doesn't exist yet
            return [];
        }
        const fileContent = fs.readFileSync(PROJECTS_FILE, 'utf-8');
        return JSON.parse(fileContent);
    } catch (error) {
        console.error("Error reading projects:", error);
        return [];
    }
}

// --- CREATE PROJECT ---
export async function createProject(formData) {
    try {
        const id = crypto.randomUUID();
        const newProject = {
            id: id,
            title: formData.get('title'),
            subtitle: formData.get('subtitle'),
            description: formData.get('description'),
            content: formData.get('content'),
            tags: formData.get('tags')?.split(',').map(t => t.trim()).filter(Boolean) || [],
            coverImage: formData.get('coverImage') || "",
            division: formData.get('division') || "General",
            icon: formData.get('icon') || "🚀",
            createdAt: new Date().toISOString()
        };

        const existingProjects = await getProjects();
        const updatedProjects = [...existingProjects, newProject];

        fs.writeFileSync(PROJECTS_FILE, JSON.stringify(updatedProjects, null, 2), 'utf-8');

        return { success: true, message: "Project created successfully!" };
    } catch (error) {
        console.error("Error creating project:", error);
        return { success: false, message: "Failed to create project." };
    }
}

// --- UPDATE PROJECT ---
export async function updateProject(id, currentData, formData) {
    // Note: currentData is optional or can be used for merging.
    // For simplicity, we'll merge from formData and existing data.
    try {
        const projects = await getProjects();
        const index = projects.findIndex(p => p.id === id);

        if (index === -1) {
            return { success: false, message: "Project not found." };
        }

        const projectToUpdate = projects[index];

        const updatedProject = {
            ...projectToUpdate,
            title: formData.get('title') || projectToUpdate.title,
            subtitle: formData.get('subtitle') || projectToUpdate.subtitle,
            description: formData.get('description') || projectToUpdate.description,
            content: formData.get('content') || projectToUpdate.content,
            tags: formData.get('tags')?.split(',').map(t => t.trim()).filter(Boolean) || projectToUpdate.tags,
            coverImage: formData.get('coverImage') || projectToUpdate.coverImage,
            division: formData.get('division') || projectToUpdate.division,
            icon: formData.get('icon') || projectToUpdate.icon,
            updatedAt: new Date().toISOString()
        };

        projects[index] = updatedProject;
        fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');

        return { success: true, message: "Project updated successfully!" };

    } catch (error) {
        console.error("Error updating project:", error);
        return { success: false, message: "Failed to update project." };
    }
}


// --- DELETE PROJECT ---
export async function deleteProject(id) {
    try {
        const projects = await getProjects();
        const newProjects = projects.filter(p => p.id !== id);

        if (projects.length === newProjects.length) {
            return { success: false, message: "Project not found." };
        }

        fs.writeFileSync(PROJECTS_FILE, JSON.stringify(newProjects, null, 2), 'utf-8');
        return { success: true, message: "Project deleted successfully!" };
    } catch (error) {
        console.error("Error deleting project:", error);
        return { success: false, message: "Failed to delete project." };
    }
}
