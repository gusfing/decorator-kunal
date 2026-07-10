const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'public/assets/projects');

async function optimizeImagesInDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            await optimizeImagesInDirectory(fullPath);
        } else if (file.match(/\.(jpg|jpeg|png)$/i)) {
            const tempPath = fullPath + '.tmp';
            try {
                // Resize to max 1600px width, compress JPEG
                await sharp(fullPath)
                    .resize({ width: 1600, withoutEnlargement: true })
                    .jpeg({ quality: 75, progressive: true })
                    .toFile(tempPath);
                
                // Replace original with optimized version
                fs.renameSync(tempPath, fullPath);
                console.log(`Optimized: ${fullPath}`);
            } catch (err) {
                console.error(`Failed to optimize ${fullPath}:`, err);
                if (fs.existsSync(tempPath)) {
                    fs.unlinkSync(tempPath);
                }
            }
        }
    }
}

optimizeImagesInDirectory(directoryPath)
    .then(() => console.log('Optimization complete.'))
    .catch(console.error);
