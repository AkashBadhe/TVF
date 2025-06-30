#!/usr/bin/env node

/**
 * Generate both types AND API client methods
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Generating types AND API client...');

try {
  // Fetch schema
  console.log('📥 Fetching OpenAPI schema...');
  execSync('curl -o openapi.json http://localhost:3000/api/docs-json', { stdio: 'inherit' });

  // Generate types
  console.log('⚙️ Generating TypeScript types...');
  execSync('pnpx openapi-typescript openapi.json --output types.d.ts', { stdio: 'inherit' });

  // Generate API client with methods
  console.log('🔧 Generating API client with methods...');
  execSync('pnpx openapi-typescript-codegen --input openapi.json --output ./generated-client --client axios', { stdio: 'inherit' });

  console.log('✅ Generated both types and API client!');
  console.log('📁 Files created:');
  console.log('  - types.d.ts (Type definitions)');
  console.log('  - generated-client/ (API client with methods)');
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.log('\n💡 Installing missing dependency...');
  
  try {
    execSync('pnpm add -D openapi-typescript-codegen', { stdio: 'inherit' });
    console.log('✅ Dependency installed, rerun the script');
  } catch (installError) {
    console.error('❌ Failed to install dependency');
  }
}
