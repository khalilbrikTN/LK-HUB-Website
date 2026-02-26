import prisma from '../../../src/lib/db';
import { NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'lkhub-super-secret-key-123';

function authenticate(req) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    try {
        jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
        return true;
    } catch {
        return false;
    }
}

export async function GET() {
    try {
        const projects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
        const formattedProjects = projects.map(p => ({
            ...p,
            tags: JSON.parse(p.tags || '[]'),
            images: JSON.parse(p.images || '[]')
        }));
        return NextResponse.json({ success: true, data: formattedProjects }, { status: 200 });
    } catch (error) {
        console.error('GET Projects Error:', error);
        return NextResponse.json({ success: false, message: 'Server error fetching projects' }, { status: 500 });
    }
}

export async function POST(req) {
    if (!authenticate(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    try {
        const data = await req.json();
        const newProject = await prisma.project.create({
            data: {
                ...data,
                tags: typeof data.tags === 'string' ? data.tags : JSON.stringify(data.tags || []),
                images: typeof data.images === 'string' ? data.images : JSON.stringify(data.images || [])
            }
        });
        return NextResponse.json({ success: true, data: newProject }, { status: 201 });
    } catch (error) {
        console.error('POST Projects Error:', error);
        return NextResponse.json({ success: false, message: 'Server error creating project' }, { status: 500 });
    }
}
