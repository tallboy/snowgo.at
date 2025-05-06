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
  
  console.log('Optimizing and copying image files...');
  execSync(`node optimize-images.js`);
} catch (error) {
  console.error('Error copying files:', error);
}

console.log('Build completed for Cloudflare Workers');
