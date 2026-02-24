import { NextResponse } from 'next/server';
import prisma from '@/src/lib/db';

// GET all projects
export async function GET() {
    try {
        const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
        const parsed = projects.map(p => ({
            ...p,
            tags: JSON.parse(p.tags || '[]'),
            images: JSON.parse(p.images || '[]'),
        }));
        return NextResponse.json(parsed);
    } catch (error) {
        console.error('GET /api/projects error:', error);
        return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
}

// POST create new project
export async function POST(request) {
    try {
        const body = await request.json();
        const project = await prisma.project.create({
            data: {
                division: body.division || 'General',
                title: body.title,
                subtitle: body.subtitle || '',
                description: body.description || '',
                content: body.content || '',
                icon: body.icon || '🚀',
                tags: JSON.stringify(Array.isArray(body.tags) ? body.tags : []),
                coverImage: body.coverImage || '',
                images: JSON.stringify(Array.isArray(body.images) ? body.images : []),
            }
        });
        return NextResponse.json({ ...project, tags: body.tags, images: body.images });
    } catch (error) {
        console.error('POST /api/projects error:', error);
        return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
    }
}

// PATCH update hidden/visibility
export async function PATCH(request) {
    try {
        const { id, ...updates } = await request.json();
        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        const project = await prisma.project.update({
            where: { id },
            data: updates,
        });
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
}

// DELETE project
export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    try {
        await prisma.project.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
