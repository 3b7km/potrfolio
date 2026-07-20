import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const directory = './public/photos';

async function generateThumbnails() {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    if (file.endsWith('.webp') && !file.endsWith('-sm.webp')) {
      const filePath = path.join(directory, file);
      const parsedPath = path.parse(filePath);
      const outputPath = path.join(directory, `${parsedPath.name}-sm${parsedPath.ext}`);
      
      console.log(`Processing ${file}...`);
      
      await sharp(filePath)
        .resize({ width: 300 }) // small width for mobile
        .webp({ quality: 80, effort: 6 })
        .toFile(outputPath);
        
      console.log(`Created ${outputPath}`);
    }
  }
}

generateThumbnails().catch(console.error);
