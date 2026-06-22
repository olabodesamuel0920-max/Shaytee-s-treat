const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const projectDir = path.resolve(__dirname, '..');
const publicDir = path.join(projectDir, 'public');

const TARGETS = [
    path.join(publicDir, 'assets', 'shaytees'),
    path.join(publicDir, 'images')
];

function getFiles(dir, files_ = []) {
    if (!fs.existsSync(dir)) return files_;
    const files = fs.readdirSync(dir);
    for (const i in files) {
        const name = path.join(dir, files[i]);
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files_);
        } else {
            const ext = path.extname(name).toLowerCase();
            // Process original PNG, JPG, JPEG files only, ignore existing webp or thumbnails
            if (['.png', '.jpg', '.jpeg'].includes(ext) && !name.includes('_thumb.')) {
                files_.push(name);
            }
        }
    }
    return files_;
}

async function optimize() {
    console.log('=== Starting Image Optimization ===');
    
    // Find all files
    let allSourceFiles = [];
    for (const target of TARGETS) {
        allSourceFiles = getFiles(target, allSourceFiles);
    }
    
    console.log(`Found ${allSourceFiles.length} source images to optimize.\n`);
    
    let totalInputSize = 0;
    let totalOutputSize = 0;
    let processedCount = 0;
    
    for (const file of allSourceFiles) {
        const ext = path.extname(file);
        const dir = path.dirname(file);
        const baseName = path.basename(file, ext);
        
        const mainWebPPath = path.join(dir, `${baseName}.webp`);
        const thumbWebPPath = path.join(dir, `${baseName}_thumb.webp`);
        
        const stats = fs.statSync(file);
        const inputSize = stats.size;
        totalInputSize += inputSize;
        
        // Define rules based on file type
        const isBoard = file.replace(/\\/g, '/').includes('/boards/');
        
        // Configs
        const mainWidth = isBoard ? 1100 : 900;
        const mainQuality = 82;
        const thumbWidth = isBoard ? 400 : 250;
        const thumbQuality = 75;
        
        try {
            const image = sharp(file);
            const metadata = await image.metadata();
            
            // 1. Process main image
            let mainBuffer;
            if (metadata.width > mainWidth) {
                mainBuffer = await sharp(file)
                    .resize({ width: mainWidth, fit: 'inside', withoutEnlargement: true })
                    .webp({ quality: mainQuality })
                    .toBuffer();
            } else {
                mainBuffer = await sharp(file)
                    .webp({ quality: mainQuality })
                    .toBuffer();
            }
            fs.writeFileSync(mainWebPPath, mainBuffer);
            
            // 2. Process thumbnail image
            let thumbBuffer;
            if (metadata.width > thumbWidth) {
                thumbBuffer = await sharp(file)
                    .resize({ width: thumbWidth, fit: 'inside', withoutEnlargement: true })
                    .webp({ quality: thumbQuality })
                    .toBuffer();
            } else {
                thumbBuffer = await sharp(file)
                    .webp({ quality: thumbQuality })
                    .toBuffer();
            }
            fs.writeFileSync(thumbWebPPath, thumbBuffer);
            
            const mainStats = fs.statSync(mainWebPPath);
            const thumbStats = fs.statSync(thumbWebPPath);
            const outputSize = mainStats.size + thumbStats.size;
            totalOutputSize += outputSize;
            
            processedCount++;
            
            console.log(`[${processedCount}/${allSourceFiles.length}] Optimized: ${path.relative(publicDir, file)}`);
            console.log(`   Original: ${(inputSize / 1024).toFixed(1)} KB`);
            console.log(`   WebP Main: ${(mainStats.size / 1024).toFixed(1)} KB | Thumb: ${(thumbStats.size / 1024).toFixed(1)} KB`);
            console.log(`   Savings: ${((1 - (outputSize / inputSize)) * 100).toFixed(1)}%\n`);
            
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
    
    console.log('=== Optimization Summary ===');
    console.log(`Total Images Processed: ${processedCount}`);
    console.log(`Total Input Size: ${(totalInputSize / (1024 * 1024)).toFixed(2)} MB`);
    console.log(`Total Output Size (WebP + Thumbs): ${(totalOutputSize / (1024 * 1024)).toFixed(2)} MB`);
    const pctSaved = ((1 - (totalOutputSize / totalInputSize)) * 100).toFixed(1);
    console.log(`Estimated Space Saved: ${pctSaved}%`);
}

optimize();
