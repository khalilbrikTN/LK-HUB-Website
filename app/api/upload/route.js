import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('file');
        const folder = formData.get('folder') || 'general';

        if (!file) {
            return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Ensure directories exist
        const uploadDir = path.join(process.cwd(), 'public', 'assets', 'media', folder);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueFileName = `${Date.now()}-${cleanFileName}`;
        const filePath = path.join(uploadDir, uniqueFileName);

        fs.writeFileSync(filePath, buffer);

        const urlPath = `/assets/media/${folder}/${uniqueFileName}`;

        return NextResponse.json({ success: true, url: urlPath }, { status: 200 });

    } catch (e) {
        console.error('Upload Error:', e);
        return NextResponse.json({ success: false, error: 'Internal server error uploading file' }, { status: 500 });
    }
}
