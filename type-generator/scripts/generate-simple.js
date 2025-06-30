#!/usr/bin/env node

/**
 * Simple type generation using openapi-typescript (now the default approach)
 */

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🚀 Generating types using openapi-typescript...');

try {
  // Fetch schema
  console.log('📥 Fetching OpenAPI schema...');
  execSync('curl -o openapi.json http://localhost:3000/api/docs-json', { stdio: 'inherit' });

  // Generate types
  console.log('⚙️ Generating TypeScript types...');
  execSync('npx openapi-typescript openapi.json --output types.d.ts', { stdio: 'inherit' });

  // Create a more user-friendly index file
  const indexContent = `// Auto-generated API types (Simple Version)
export * from './types';

// Common utility types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: {
    items: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}`;

  fs.writeFileSync('index.ts', indexContent);
  
  console.log('✅ Types generated successfully!');
  console.log('📁 Files created:');
  console.log('  - openapi.json (API schema)');
  console.log('  - types.d.ts (Generated types)');
  console.log('  - index.ts (Exports)');
  
} catch (error) {
  console.error('❌ Error generating types:', error.message);
  
  if (error.message.includes('curl')) {
    console.log('\n💡 Troubleshooting:');
    console.log('1. Make sure your backend is running on http://localhost:3000');
    console.log('2. Try opening http://localhost:3000/api/docs-json in your browser');
    console.log('3. If curl is not available, manually download the JSON and run:');
    console.log('   npx openapi-typescript openapi.json --output types.d.ts');
  }
  
  process.exit(1);
}
