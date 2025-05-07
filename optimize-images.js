// Image optimization script
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
import imageminSvgo from 'imagemin-svgo';
import imageminGifsicle from 'imagemin-gifsicle';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { execSync } from 'child_process';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Helper function to format file size
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
  else return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

async function optimizeImages() {
  console.log('Starting image optimization...');
  
  // Define source and destination directories
  const sourceDir = path.join(__dirname, 'img');
  const destDir = path.join(__dirname, 'dist', 'img');
  
  // Create destination directory if it doesn't exist
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  try {
    // First, copy all files to maintain directory structure
    console.log('Copying image files to maintain directory structure...');
    execSync(`cp -R ${sourceDir}/* ${destDir}`);
    
    // Track optimization statistics
    let totalSizeBefore = 0;
    let totalSizeAfter = 0;
    let totalFiles = 0;
    
    // Function to optimize images by type while preserving directory structure
    async function optimizeImagesByType(fileExtensions, plugins, description) {
      console.log(`\nProcessing ${description} images...`);
      
      // Get all matching files
      const globPattern = `${destDir}/**/*.{${fileExtensions}}`;
      console.log(`Searching for ${description} files with pattern: ${globPattern}`);
      const files = await glob(globPattern, { nodir: true });
      console.log(`Found ${files.length} ${description} files to optimize`);
      
      // Debug: List all found files
      if (files.length > 0) {
        console.log(`First few ${description} files:`, files.slice(0, 3));
      }
      
      if (files.length === 0) return;
      
      let typeSizeBefore = 0;
      let typeSizeAfter = 0;
      
      // Process each file individually to preserve directory structure
      for (const file of files) {
        const directory = path.dirname(file);
        const filename = path.basename(file);
        
        // Get file size before optimization
        const statsBefore = fs.statSync(file);
        const fileSizeBefore = statsBefore.size;
        typeSizeBefore += fileSizeBefore;
        totalSizeBefore += fileSizeBefore;
        
        // Create a temporary file path for the optimized output
        const tempOutputPath = path.join(directory, `temp-${filename}`);
        
        try {
          // Optimize the file
          await imagemin([file], {
            destination: directory,
            plugins
          });
          
          // Get file size after optimization
          const statsAfter = fs.statSync(file);
          const fileSizeAfter = statsAfter.size;
          typeSizeAfter += fileSizeAfter;
          totalSizeAfter += fileSizeAfter;
          
          // Calculate size reduction
          const reduction = fileSizeBefore - fileSizeAfter;
          const percentReduction = (reduction / fileSizeBefore) * 100;
          
          console.log(`  - ${filename}: ${formatFileSize(fileSizeBefore)} → ${formatFileSize(fileSizeAfter)} (${percentReduction.toFixed(2)}% reduction)`);
        } catch (error) {
          console.error(`  - Error optimizing ${filename}: ${error.message}`);
          // If optimization fails, ensure we count the original size
          typeSizeAfter += fileSizeBefore;
          totalSizeAfter += fileSizeBefore;
        }
        
        totalFiles++;
      }
      
      // Log summary for this file type
      const typeReduction = typeSizeBefore - typeSizeAfter;
      const typePercentReduction = (typeReduction / typeSizeBefore) * 100;
      console.log(`\n${description} optimization summary:`);
      console.log(`  - Total size before: ${formatFileSize(typeSizeBefore)}`);
      console.log(`  - Total size after: ${formatFileSize(typeSizeAfter)}`);
      console.log(`  - Total reduction: ${formatFileSize(typeReduction)} (${typePercentReduction.toFixed(2)}%)`);
    }
    
    // Process JPEG images
    await optimizeImagesByType('jpg,jpeg', [
      imageminJpegtran({ progressive: true })
    ], 'JPEG');
    
    // Process PNG images using direct file system access
    console.log('\nProcessing PNG images...');
    
    // Find all PNG files using fs.readdirSync recursively
    function findPngFiles(dir) {
      let results = [];
      const list = fs.readdirSync(dir);
      
      for (const file of list) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // Recursively search directories
          results = results.concat(findPngFiles(filePath));
        } else if (file.toLowerCase().endsWith('.png')) {
          results.push(filePath);
        }
      }
      
      return results;
    }
    
    const pngFiles = findPngFiles(destDir);
    console.log(`Found ${pngFiles.length} PNG files to optimize`);
    
    if (pngFiles.length > 0) {
      console.log(`First few PNG files:`, pngFiles.slice(0, 3));
      
      let typeSizeBefore = 0;
      let typeSizeAfter = 0;
      
      // Process each PNG file
      for (const file of pngFiles) {
        const directory = path.dirname(file);
        const filename = path.basename(file);
        
        // Get file size before optimization
        const statsBefore = fs.statSync(file);
        const fileSizeBefore = statsBefore.size;
        typeSizeBefore += fileSizeBefore;
        totalSizeBefore += fileSizeBefore;
        
        try {
          // Optimize the file
          await imagemin([file], {
            destination: directory,
            plugins: [
              imageminPngquant({
                quality: [0.6, 0.8], // Quality range from 0.6 to 0.8 (60-80%)
                strip: true // Strip optional metadata
              })
            ]
          });
          
          // Get file size after optimization
          const statsAfter = fs.statSync(file);
          const fileSizeAfter = statsAfter.size;
          typeSizeAfter += fileSizeAfter;
          totalSizeAfter += fileSizeAfter;
          
          // Calculate size reduction
          const reduction = fileSizeBefore - fileSizeAfter;
          const percentReduction = (reduction / fileSizeBefore) * 100;
          
          console.log(`  - ${filename}: ${formatFileSize(fileSizeBefore)} → ${formatFileSize(fileSizeAfter)} (${percentReduction.toFixed(2)}% reduction)`);
        } catch (error) {
          console.error(`  - Error optimizing ${filename}: ${error.message}`);
          // If optimization fails, ensure we count the original size
          typeSizeAfter += fileSizeBefore;
          totalSizeAfter += fileSizeBefore;
        }
        
        totalFiles++;
      }
      
      // Log summary for PNG files
      const typeReduction = typeSizeBefore - typeSizeAfter;
      const typePercentReduction = (typeReduction / typeSizeBefore) * 100;
      console.log(`\nPNG optimization summary:`);
      console.log(`  - Total size before: ${formatFileSize(typeSizeBefore)}`);
      console.log(`  - Total size after: ${formatFileSize(typeSizeAfter)}`);
      console.log(`  - Total reduction: ${formatFileSize(typeReduction)} (${typePercentReduction.toFixed(2)}%)`);
    }
    
    // Process SVG images
    await optimizeImagesByType('svg', [
      imageminSvgo({
        plugins: [
          { name: 'removeViewBox', active: false },
          { name: 'cleanupIDs', active: false }
        ]
      })
    ], 'SVG');
    
    // Process GIF images
    await optimizeImagesByType('gif', [
      imageminGifsicle({ optimizationLevel: 3 }) // Maximum optimization
    ], 'GIF');
    
    // Log overall summary
    const totalReduction = totalSizeBefore - totalSizeAfter;
    const totalPercentReduction = (totalReduction / totalSizeBefore) * 100;
    console.log('\n===== OPTIMIZATION SUMMARY =====');
    console.log(`Total files processed: ${totalFiles}`);
    console.log(`Total size before: ${formatFileSize(totalSizeBefore)}`);
    console.log(`Total size after: ${formatFileSize(totalSizeAfter)}`);
    console.log(`Total reduction: ${formatFileSize(totalReduction)} (${totalPercentReduction.toFixed(2)}%)`);
    
    console.log('Image optimization completed successfully!');
  } catch (error) {
    console.error('Error during image optimization:', error);
  }
}

// Run the optimization
optimizeImages();
