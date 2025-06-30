#!/usr/bin/env node

/**
 * Build script for NPM package
 * Creates multiple output formats (CJS, ESM) and proper type definitions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('📦 Building NPM package...');

try {
  // Ensure dist directory exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }

  console.log('📝 Creating package entry points...');

  // Create main index file (types + client)
  const mainIndex = `// Main export - both types and client
export * from './types';
export * from './client';

// Default export for convenience
import * as types from './types';
import * as client from './client';

export default {
  types,
  client
};
`;

  // Create types-only export
  const typesIndex = `// Types-only export
export * from '../types';

// Re-export all generated types
import type { components, operations, paths } from '../types';

export type {
  components,
  operations,
  paths
};

// Common type aliases for convenience
export type MenuItem = components['schemas']['CreateMenuItemDto'];
export type Category = components['schemas']['CreateCategoryDto'];
export type Order = components['schemas']['CreateOrderDto'];
export type User = components['schemas']['RegisterDto'];
export type LoginRequest = components['schemas']['LoginDto'];
export type ApiResponse<T = any> = {
  success: boolean;
  data: T;
  message?: string;
};
`;

  // Create client-only export
  const clientIndex = `// Client-only export
export * from '../generated-client';

// Re-export services for convenience
export {
  AuthenticationService,
  MenuService,
  CartService,
  OrdersService,
  RestaurantService,
  UploadService
} from '../generated-client';

// Export core utilities
export {
  ApiError,
  type ApiRequestOptions,
  type ApiResult,
  CancelablePromise,
  OpenAPI
} from '../generated-client';
`;

  // Write entry point files
  fs.writeFileSync(path.join('dist', 'index.js'), `module.exports = require('./index.cjs');\n`);
  fs.writeFileSync(path.join('dist', 'index.esm.js'), mainIndex);
  fs.writeFileSync(path.join('dist', 'index.d.ts'), mainIndex);

  fs.writeFileSync(path.join('dist', 'types.js'), `module.exports = require('./types.cjs');\n`);
  fs.writeFileSync(path.join('dist', 'types.esm.js'), typesIndex);
  fs.writeFileSync(path.join('dist', 'types.d.ts'), typesIndex);

  fs.writeFileSync(path.join('dist', 'client.js'), `module.exports = require('./client.cjs');\n`);
  fs.writeFileSync(path.join('dist', 'client.esm.js'), clientIndex);
  fs.writeFileSync(path.join('dist', 'client.d.ts'), clientIndex);

  // Copy and compile generated files to dist
  console.log('📋 Copying and compiling generated files...');
  
  if (fs.existsSync('types.d.ts')) {
    fs.copyFileSync('types.d.ts', path.join('dist', 'types.generated.d.ts'));
  }

  if (fs.existsSync('generated-client')) {
    // First, compile the TypeScript client to JavaScript
    console.log('🔧 Compiling TypeScript client...');
    try {
      execSync('npx tsc -p generated-client/tsconfig.json --outDir dist/generated-client', { stdio: 'inherit' });
    } catch (error) {
      console.log('⚠️  TypeScript compilation failed, copying raw files...');
      // Fallback: Windows-compatible recursive copy
      const copyRecursiveSync = (src, dest) => {
        if (fs.statSync(src).isDirectory()) {
          if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
          }
          const entries = fs.readdirSync(src, { withFileTypes: true });
          for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);
            if (entry.isDirectory()) {
              copyRecursiveSync(srcPath, destPath);
            } else {
              fs.copyFileSync(srcPath, destPath);
            }
          }
        } else {
          fs.copyFileSync(src, dest);
        }
      };
      
      copyRecursiveSync('generated-client', path.join('dist', 'generated-client'));
    }
  }

  // Create CommonJS versions using simple transformations
  console.log('🔄 Creating CommonJS exports...');
  
  const cjsMain = `const types = require('./types.cjs');
const client = require('./client.cjs');

module.exports = {
  ...types,
  ...client,
  types,
  client
};
`;

  const cjsTypes = `const types = require('./types.generated');
module.exports = types;
`;

  const cjsClient = `const client = require('./generated-client');
module.exports = client;
`;

  fs.writeFileSync(path.join('dist', 'index.cjs'), cjsMain);
  fs.writeFileSync(path.join('dist', 'types.cjs'), cjsTypes);
  fs.writeFileSync(path.join('dist', 'client.cjs'), cjsClient);

  console.log('✅ Package build completed!');
  console.log('📁 Generated files:');
  console.log('  - dist/index.* (main exports)');
  console.log('  - dist/types.* (types-only)');
  console.log('  - dist/client.* (client-only)');
  console.log('  - dist/generated-client/ (full client)');
  console.log('  - dist/types.generated.d.ts (raw types)');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
