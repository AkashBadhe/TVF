#!/usr/bin/env node

/**
 * Script to integrate generated types with the frontend project
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const frontendPath = path.join(__dirname, '../../frontend');
const typesDestination = path.join(frontendPath, 'src/app/shared/generated-types');

console.log('🔗 Integrating types with frontend...');

// Check if frontend exists
if (!fs.existsSync(frontendPath)) {
  console.error('❌ Frontend directory not found at:', frontendPath);
  process.exit(1);
}

// Create types directory in frontend
if (!fs.existsSync(typesDestination)) {
  fs.mkdirSync(typesDestination, { recursive: true });
  console.log('📁 Created types directory in frontend');
}

// Copy generated types
const distPath = path.join(__dirname, '../dist');
if (fs.existsSync(distPath)) {
  // Copy all files from dist to frontend (Windows compatible)
  const copyCommand = process.platform === 'win32' 
    ? `xcopy "${distPath}\\*" "${typesDestination}\\" /E /I /Y`
    : `cp -r "${distPath}/*" "${typesDestination}/"`;
  
  try {
    execSync(copyCommand, { stdio: 'inherit' });
    console.log('✅ Copied types to frontend');
  } catch (error) {
    // Fallback: manual copy for Windows
    const files = fs.readdirSync(distPath);
    files.forEach(file => {
      const srcFile = path.join(distPath, file);
      const destFile = path.join(typesDestination, file);
      if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile);
      }
    });
    console.log('✅ Copied types to frontend (fallback method)');
  }
} else {
  console.log('⚠️ No generated types found. Run npm run build first.');
  process.exit(1);
}

// Update frontend's shared models index to include generated types
const sharedModelsIndex = path.join(frontendPath, 'src/app/shared/models/index.ts');
if (fs.existsSync(sharedModelsIndex)) {
  let content = fs.readFileSync(sharedModelsIndex, 'utf8');
  
  const generatedImport = `
// Auto-generated types from backend API
export * from '../generated-types';`;

  // Add the import if it doesn't exist
  if (!content.includes('generated-types')) {
    content += generatedImport;
    fs.writeFileSync(sharedModelsIndex, content);
    console.log('✅ Updated frontend models index');
  }
}

console.log('🎉 Integration complete!');
console.log('');
console.log('Next steps:');
console.log('1. Replace manual type definitions with generated ones');
console.log('2. Update your services to use the new types');
console.log('3. Run "pnpm run build" in frontend to verify everything works');
