const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define storage settings for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Fallback folder to 'general' if none specified in request body
        const folder = req.body.folder || 'general';

        // Target path matches Next.js public directory architecture
        const absolutePath = path.join(process.cwd(), 'public', 'assets', 'media', 'uploads', folder);

        // Ensure directory exists synchronously before saving
        if (!fs.existsSync(absolutePath)) {
            fs.mkdirSync(absolutePath, { recursive: true });
        }

        cb(null, absolutePath);
    },
    filename: (req, file, cb) => {
        // Sanitize filename and prepend timestamp to ensure uniqueness
        const cleanName = file.originalname.replace(/\s+/g, '-');
        const filename = `${Date.now()}-${cleanName}`;
        cb(null, filename);
    }
});

// Configure Multer 
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Set limit to 10MB per file
});

module.exports = upload;
