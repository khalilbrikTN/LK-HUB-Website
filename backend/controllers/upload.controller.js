exports.uploadFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded.' });
        }

        const folder = req.body.folder || 'general';

        // This is the relative URL Next.js components actually use to render the image
        const relativePath = `/assets/media/uploads/${folder}/${req.file.filename}`;

        res.status(200).json({ success: true, url: relativePath });
    } catch (error) {
        console.error('Upload Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error during upload.' });
    }
};
