// Simple build script for Cloudflare Workers
// This script uses only core Node.js modules to avoid dependency issues

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Starting build for Cloudflare Workers...');

// Create dist directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
}

// Copy the static index.html file to dist
try {
  console.log('Copying index.html to dist...');
  fs.copyFileSync(
    path.join(__dirname, 'index.html'), 
    path.join(__dirname, 'dist', 'index.html')
  );
  console.log('Copied index.html');
} catch (error) {
  console.error('Error copying index.html:', error);
}

// Copy directories using shell commands to avoid Node.js API issues
try {
  console.log('Copying CSS files...');
  execSync(`mkdir -p ${path.join(__dirname, 'dist', 'css')}`);
  execSync(`cp -R ${path.join(__dirname, 'css')}/* ${path.join(__dirname, 'dist', 'css')}`);
  
  console.log('Copying JS files...');
  execSync(`mkdir -p ${path.join(__dirname, 'dist', 'js')}`);
  execSync(`cp -R ${path.join(__dirname, 'js')}/* ${path.join(__dirname, 'dist', 'js')}`);
  
  // Copy goats.js to dist directory
  console.log('Copying goats.js to dist directory...');
  try {
    execSync(`cp ${path.join(__dirname, 'goats.js')} ${path.join(__dirname, 'dist')}`);
    console.log('Successfully copied goats.js to dist directory');
  } catch (error) {
    console.error('Error copying goats.js:', error);
    console.log('Will rely on fallback data');
  }
  
  console.log('Copying image files...');
  try {
    // Create image directory if it doesn't exist
    execSync(`mkdir -p ${path.join(__dirname, 'dist', 'img')}`);
    
    // Create subdirectories
    console.log('Creating image subdirectories...');
    execSync(`mkdir -p ${path.join(__dirname, 'dist', 'img', 'goats')}`);
    execSync(`mkdir -p ${path.join(__dirname, 'dist', 'img', 'favicons')}`);
    
    // Copy images directly with explicit paths for each subdirectory, excluding .DS_Store files
    console.log('Copying goat images...');
    execSync(`cp ${path.join(__dirname, 'img', 'goats')}/* ${path.join(__dirname, 'dist', 'img', 'goats')}/ 2>/dev/null || true`);
    
    // Remove any .DS_Store files from the destination
    console.log('Removing any .DS_Store files...');
    execSync(`find ${path.join(__dirname, 'dist')} -name ".DS_Store" -type f -delete`);
    
    console.log('Copying favicon images...');
    execSync(`cp ${path.join(__dirname, 'img', 'favicons')}/* ${path.join(__dirname, 'dist', 'img', 'favicons')}/ 2>/dev/null || true`);
    
    console.log('Copying root images...');
    execSync(`cp ${path.join(__dirname, 'img')}/*.png ${path.join(__dirname, 'dist', 'img')}/ 2>/dev/null || true`);
    
    // Verify that all image files were copied correctly
    const sourceGoatsDir = path.join(__dirname, 'img', 'goats');
    const destGoatsDir = path.join(__dirname, 'dist', 'img', 'goats');
    
    if (fs.existsSync(sourceGoatsDir) && fs.existsSync(destGoatsDir)) {
      // Filter out .DS_Store files from the source directory
      const sourceFiles = fs.readdirSync(sourceGoatsDir)
        .filter(file => file !== '.DS_Store' && !fs.statSync(path.join(sourceGoatsDir, file)).isDirectory());
      const destFiles = fs.readdirSync(destGoatsDir);
      
      console.log(`Source goats directory contains ${sourceFiles.length} valid image files`);
      console.log(`Destination goats directory contains ${destFiles.length} files`);
      
      // Check if all valid source files (excluding .DS_Store) are in the destination
      const missingFiles = sourceFiles.filter(file => !destFiles.includes(file));
      
      if (missingFiles.length > 0) {
        console.warn('Warning: Some image files were not copied!');
        console.log('Missing files:', missingFiles);
      } else {
        console.log('All image files copied successfully.');
      }
    }
    
    // Skip the optimization step as it's causing issues
    console.log('Skipping image optimization due to compatibility issues.');
  } catch (copyError) {
    console.error('Error copying image files:', copyError);
    // Log more details but don't throw the error to allow the build to continue
    console.log('Continuing build process despite image copy error.');
  }
} catch (error) {
  console.error('Error copying files:', error);
}

console.log('Build completed for Cloudflare Workers');
