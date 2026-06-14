import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const photosDir = path.join(process.cwd(), 'public', 'photos');

async function optimizeImages() {
  const files = fs.readdirSync(photosDir).filter(file => file.endsWith('.webp'));
  
  for (const file of files) {
    const filePath = path.join(photosDir, file);
    const tempPath = path.join(photosDir, `temp-${file}`);
    
    try {
      // Get image metadata to determine dimensions
      const metadata = await sharp(filePath).metadata();
      
      // Target max width is 800px, but don't upscale
      const width = Math.min(metadata.width || 800, 800);
      
      await sharp(filePath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 80, effort: 6 }) // Optimize compression
        .toFile(tempPath);
        
      // Replace original file
      fs.renameSync(tempPath, filePath);
      console.log(`Optimized ${file} - Width limited to ${width}px`);
    } catch (err) {
      console.error(`Error optimizing ${file}:`, err);
    }
  }
}

optimizeImages();
