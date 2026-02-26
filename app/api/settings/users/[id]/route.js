import prisma from '../../../../../src/lib/db';
import { NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'lkhub-super-secret-key-123';

function authenticate(req) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
    try {
        const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
        return decoded;
    } catch {
        return false;
    }
}

export async function DELETE(req, { params }) {
    const userContext = authenticate(req);
    if (!userContext) return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    const { id } = await params;
    try {
        const user = await prisma.user.findUnique({ where: { id } });

        if (!user) {
            return NextResponse.json({ success: false, message: 'User not found.' }, { status: 404 });
        }
        if (user.role === 'Super Admin') {
            return NextResponse.json({ success: false, message: 'Cannot delete Super Admin.' }, { status: 403 });
        }
        if (userContext.id === id) {
            return NextResponse.json({ success: false, message: 'You cannot delete your own account.' }, { status: 403 });
        }

        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ success: true, message: 'User deleted successfully!' }, { status: 200 });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({ success: false, message: 'Failed to delete user.' }, { status: 500 });
    }
}
