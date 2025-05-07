#!/usr/bin/env node

/**
 * Add Goat Script
 * 
 * This script automates the process of adding a new goat to the Snow Goat website.
 * It takes a name, image file, and description, then updates the goats.js file
 * and copies the image to the correct directory.
 * 
 * Usage:
 *   node scripts/add-goat.js --name "Goat Name" --image path/to/image.jpg --description "Description text"
 * 
 * Options:
 *   --name, -n         The name of the goat
 *   --image, -i        Path to the goat's image file
 *   --description, -d  Description of the goat (can use HTML)
 *   --help, -h         Show help
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';
import { execSync } from 'child_process';

// Get the directory name
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  name: '',
  image: '',
  description: '',
};

// Parse arguments
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  if (arg === '--name' || arg === '-n') {
    options.name = args[++i];
  } else if (arg === '--image' || arg === '-i') {
    options.image = args[++i];
  } else if (arg === '--description' || arg === '-d') {
    options.description = args[++i];
  } else if (arg === '--help' || arg === '-h') {
    showHelp();
    process.exit(0);
  }
}

// Show help function
function showHelp() {
  console.log(`
Add Goat Script

This script automates the process of adding a new goat to the Snow Goat website.
It takes a name, image file, and description, then updates the goats.js file
and copies the image to the correct directory.

Usage:
  node scripts/add-goat.js --name "Goat Name" --image path/to/image.jpg --description "Description text"

Options:
  --name, -n         The name of the goat
  --image, -i        Path to the goat's image file
  --description, -d  Description of the goat (can use HTML)
  --help, -h         Show help
  `);
}

// Validate inputs
if (!options.name || !options.image || !options.description) {
  console.error('Error: Missing required arguments');
  showHelp();
  process.exit(1);
}

// Check if image file exists
if (!fs.existsSync(options.image)) {
  console.error(`Error: Image file not found: ${options.image}`);
  process.exit(1);
}

// Main function
async function addGoat() {
  try {
    // 1. Copy image to the goats directory
    const imagePath = options.image;
    const imageExt = path.extname(imagePath);
    const imageFileName = options.name.toLowerCase().replace(/\s+/g, '-') + imageExt;
    const destImagePath = path.join(projectRoot, 'img', 'goats', imageFileName);
    
    // Create directory if it doesn't exist
    const goatsDir = path.join(projectRoot, 'img', 'goats');
    if (!fs.existsSync(goatsDir)) {
      fs.mkdirSync(goatsDir, { recursive: true });
    }
    
    // Copy the image
    fs.copyFileSync(imagePath, destImagePath);
    console.log(`✅ Image copied to: ${destImagePath}`);
    
    // 2. Update goats.js file
    const goatsFilePath = path.join(projectRoot, 'goats.js');
    let goatsFileContent = fs.readFileSync(goatsFilePath, 'utf8');
    
    // Create new goat entry
    const newGoatEntry = `  {
    name: "${options.name}",
    image: img("${imageFileName}"),
    description: html\`
      ${options.description}
    \`,
  },
`;
    
    // Find the position to insert the new goat (before the last entry)
    const exportDefaultIndex = goatsFileContent.indexOf('export default [');
    if (exportDefaultIndex === -1) {
      throw new Error('Could not find export default in goats.js');
    }
    
    // Insert the new goat at the beginning of the array
    const insertPosition = exportDefaultIndex + 'export default ['.length;
    goatsFileContent = 
      goatsFileContent.slice(0, insertPosition) + 
      '\n' + newGoatEntry +
      goatsFileContent.slice(insertPosition);
    
    // Write the updated content back to the file
    fs.writeFileSync(goatsFilePath, goatsFileContent);
    console.log(`✅ Added ${options.name} to goats.js`);
    
    console.log(`\n🎉 Successfully added ${options.name} as a new Snow Goat!`);
    console.log(`\nTo see your changes, run: npm start`);
    
  } catch (error) {
    console.error('Error adding goat:', error);
    process.exit(1);
  }
}

// Run the main function
addGoat();
