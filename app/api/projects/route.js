import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Define the path to the data file
const PROJECTS_FILE = path.join(process.cwd(), 'src', 'data', 'projects.json');

// Helper to Read
const getProjects = () => {
    if (!fs.existsSync(PROJECTS_FILE)) return [];
    const fileContent = fs.readFileSync(PROJECTS_FILE, 'utf-8');
    try {
        return JSON.parse(fileContent);
    } catch (e) {
        console.error("JSON parse error", e);
        return [];
    }
};

// GET Handler
export async function GET() {
    const projects = getProjects();
    return NextResponse.json(projects);
}

// POST Handler (Create/Update)
export async function POST(request) {
    try {
        const body = await request.json();
        const projects = getProjects();

        if (body.id) {
            // Update existing
            const index = projects.findIndex(p => p.id === body.id);
            if (index !== -1) {
                projects[index] = { ...projects[index], ...body };
                fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 4), 'utf-8');
                return NextResponse.json(projects[index]);
            }
        }

        // Create new
        const newProject = {
            id: `project-${Date.now()}`,
            createdAt: new Date().toISOString(),
            ...body
        };
        projects.push(newProject);
        fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 4), 'utf-8');
        return NextResponse.json(newProject);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to save project' }, { status: 500 });
    }
}

// PATCH Handler (for visibility toggle)
export async function PATCH(request) {
    try {
        const { id, hidden } = await request.json();
        const projects = getProjects();
        const index = projects.findIndex(p => p.id === id);

        if (index === -1) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        projects[index].hidden = hidden;
        fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 4), 'utf-8');
        return NextResponse.json(projects[index]);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

// DELETE Handler
export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const projects = getProjects();
        const newProjects = projects.filter(p => p.id !== id);
        fs.writeFileSync(PROJECTS_FILE, JSON.stringify(newProjects, null, 4), 'utf-8');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
