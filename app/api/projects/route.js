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

// DELETE Handler (for simplicity, we handle DELETE here directly)
export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const projects = getProjects();
        const initialLength = projects.length;
        const newProjects = projects.filter(p => p.id !== id);

        if (initialLength === newProjects.length) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }

        fs.writeFileSync(PROJECTS_FILE, JSON.stringify(newProjects, null, 2), 'utf-8');
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
