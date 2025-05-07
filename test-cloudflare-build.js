#!/usr/bin/env node

/**
 * Simple script to test the Cloudflare Workers build
 * This script will:
 * 1. Run the cloudflare-build script
 * 2. Check if the dist directory was created
 * 3. Check if the necessary files were copied
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Testing Cloudflare Workers build...');

// Run the cloudflare-build script
try {
  console.log('Running cloudflare-build script...');
  execSync('npm run cloudflare-build', { stdio: 'inherit' });
} catch (error) {
  console.error('Error running cloudflare-build script:', error);
  process.exit(1);
}

// Check if the dist directory was created
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  console.error('Error: dist directory was not created');
  process.exit(1);
}

// Check if the necessary files were copied
const requiredFiles = [
  'index.html',
  'css/bootstrap-overrides.css',
  'css/footer.css',
  'css/global.css',
  'css/goats.css',
  'css/index.css',
  'css/masthead.css',
  'css/navbar.css',
  'css/variables.css',
  'js/index.js'
];

let allFilesExist = true;
for (const file of requiredFiles) {
  const filePath = path.join(__dirname, 'dist', file);
  if (!fs.existsSync(filePath)) {
    console.error(`Error: ${file} was not copied to the dist directory`);
    allFilesExist = false;
  }
}

if (!allFilesExist) {
  process.exit(1);
}

console.log('All required files were copied to the dist directory');
console.log('Cloudflare Workers build test passed!');
