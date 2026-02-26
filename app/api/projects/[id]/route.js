import prisma from '../../../../src/lib/db';
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

export async function PUT(req, { params }) {
    if (!authenticate(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    try {
        const data = await req.json();
        const updatedProject = await prisma.project.update({
            where: { id },
            data: {
                ...data,
                tags: typeof data.tags === 'string' ? data.tags : JSON.stringify(data.tags || []),
                images: typeof data.images === 'string' ? data.images : JSON.stringify(data.images || [])
            }
        });
        return NextResponse.json({ success: true, data: updatedProject }, { status: 200 });
    } catch (error) {
        console.error('PUT Projects Error:', error);
        return NextResponse.json({ success: false, message: 'Server error updating project' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    if (!authenticate(req)) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    try {
        await prisma.project.delete({ where: { id } });
        return NextResponse.json({ success: true, message: 'Deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('DELETE Projects Error:', error);
        return NextResponse.json({ success: false, message: 'Server error deleting project' }, { status: 500 });
    }
}
