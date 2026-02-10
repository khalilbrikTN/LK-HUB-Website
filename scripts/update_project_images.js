const fs = require('fs');
const path = require('path');

// Adjusted paths relative to where the script is run (root) or __dirname
const PROJECTS_JSON_PATH = path.join(__dirname, '../src/data/projects.json');
const MEDIA_BASE_DIR = path.join(__dirname, '../public/assets/media/lk-education/projects');

console.log('Reading projects from:', PROJECTS_JSON_PATH);
const projects = JSON.parse(fs.readFileSync(PROJECTS_JSON_PATH, 'utf8'));

const updatedProjects = projects.map(proj => {
    let images = [];

    // Only process education projects (or those with folders in that specific path)
    if (proj.division === 'lk-education' || proj.id.startsWith('lk-edu-')) {
        let folderName = null;

        // Try to extract folder name from coverImage path
        if (proj.coverImage && proj.coverImage.includes('/lk-education/projects/')) {
            const parts = proj.coverImage.split('/lk-education/projects/');
            if (parts.length > 1) {
                // The part after might be "Folder Name/coverPicture.jpg"
                folderName = parts[1].split('/')[0];
            }
        }
        // Fallback: Try matching title to folder name
        else {
            // We could list directories and fuzzy match, but coverImage is safer if it exists
            // If coverImage is null, we can't easily guess the folder unless we standardize
            if (fs.existsSync(path.join(MEDIA_BASE_DIR, proj.title))) {
                folderName = proj.title;
            }
        }

        if (folderName) {
            const fullFolderPath = path.join(MEDIA_BASE_DIR, folderName);

            if (fs.existsSync(fullFolderPath)) {
                // Read all files in the directory
                const files = fs.readdirSync(fullFolderPath);

                // Filter for images and exclude coverPicture.jpg (case insensitive)
                images = files
                    .filter(file => {
                        const lowerFile = file.toLowerCase();
                        const isImage = lowerFile.endsWith('.jpg') || lowerFile.endsWith('.jpeg') || lowerFile.endsWith('.png') || lowerFile.endsWith('.webp');
                        const isCover = lowerFile.includes('coverpicture');
                        return isImage && !isCover;
                    })
                    .map(file => `/assets/media/lk-education/projects/${folderName}/${file}`);

                console.log(`[${proj.title}] Found ${images.length} additional images.`);
            } else {
                console.warn(`[${proj.title}] Folder not found: ${fullFolderPath}`);
            }
        }
    }

    // Only update images if we found any (or if we want to clear them if none found? safer to keep existing if script fails?)
    // No, we want to OVERWRITE with current truth. If folder exists but empty, images should be [].
    // If folder doesn't exist, maybe keep existing? No, that leads to stale links.
    // Let's set it.

    return {
        ...proj,
        images: images.length > 0 ? images : (proj.images || []) // Fallback to existing if we didn't find a folder, to be safe. But if we found folder and it has 0, it will be [].
    };
});

fs.writeFileSync(PROJECTS_JSON_PATH, JSON.stringify(updatedProjects, null, 4));
console.log('Update complete.');
