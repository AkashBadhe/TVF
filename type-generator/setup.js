#!/usr/bin/env node

/**
 * One-time setup script for the type generation system
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up TVF Type Generation System...\n');

try {
  // Check if backend is running
  console.log('1️⃣ Checking backend availability...');
  try {
    execSync('curl -f http://localhost:3000/api/docs-json > nul 2>&1', { stdio: 'pipe' });
    console.log('✅ Backend is running and accessible');
  } catch (error) {
    console.log('⚠️ Backend is not running. Please start it first:');
    console.log('   cd ../backend && npm run start:dev');
    console.log('');
  }

  // Install dependencies
  console.log('2️⃣ Installing dependencies...');
  execSync('pnpm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');

  // Generate types for the first time
  console.log('3️⃣ Generating types for the first time...');
  try {
    execSync('pnpm run integrate', { stdio: 'inherit' });
    console.log('✅ Types generated and integrated with frontend');
  } catch (error) {
    console.log('⚠️ Could not generate types. Make sure backend is running.');
  }

  console.log('\n🎉 Setup complete!\n');
  console.log('Available commands:');
  console.log('  pnpm run build      - Generate types once');
  console.log('  pnpm run integrate  - Generate and copy to frontend');
  console.log('  pnpm run dev        - Watch mode (auto-regenerate)');
  console.log('  pnpm run simple     - Use simpler openapi-typescript');
  console.log('\n📖 See README.md for detailed usage instructions');

} catch (error) {
  console.error('❌ Setup failed:', error.message);
  process.exit(1);
}
