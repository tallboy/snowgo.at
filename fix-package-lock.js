#!/usr/bin/env node

// Script to replace private npm registry URLs with public npm registry URLs in package-lock.json
import fs from 'fs';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('Fixing package-lock.json registry URLs...');

// Path to package-lock.json
const packageLockPath = path.join(__dirname, 'package-lock.json');

try {
  // Check if package-lock.json exists
  if (!fs.existsSync(packageLockPath)) {
    console.error('package-lock.json not found!');
    process.exit(1);
  }

  // Replace private registry URLs with public npm registry URLs using sed
  const privateRegistryUrl = 'https://artifact.devsnc.com/repository/npm-all/';
  const publicRegistryUrl = 'https://registry.npmjs.org/';
  
  // Use sed to replace all occurrences of the private registry URL with the public one
  const sedCommand = `sed -i '' 's|${privateRegistryUrl}|${publicRegistryUrl}|g' ${packageLockPath}`;
  
  console.log(`Executing: ${sedCommand}`);
  execSync(sedCommand);
  
  console.log('Successfully updated package-lock.json with public npm registry URLs');
} catch (error) {
  console.error('Error updating package-lock.json:', error);
  process.exit(1);
}
