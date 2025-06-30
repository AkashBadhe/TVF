# TVF API Types Generator

This package automatically generates TypeScript types from the TVF Restaurant API's OpenAPI specification.

## Features

- 🔄 **Auto-sync**: Automatically fetches the latest API schema
- 📦 **Type Safety**: Generates comprehensive TypeScript interfaces
- 🚀 **Easy Integration**: Simple to integrate with frontend projects
- 👀 **Watch Mode**: Automatically regenerates when backend changes

## Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Generate Types
```bash
# One-time generation
pnpm run build

# Watch mode (regenerates when backend changes)
pnpm run dev
```

### 3. Use in Frontend
```typescript
// In your frontend project
import { 
  CreateMenuItemRequest, 
  MenuFilters, 
  ApiResponse,
  AuthResponse 
} from '@tvf/types';

// Example usage
const menuItem: CreateMenuItemRequest = {
  name: "Margherita Pizza",
  description: "Classic pizza with tomato and mozzarella",
  price: 12.99,
  categoryId: "pizzas",
  // ... other properties with full type safety
};
```

## Available Scripts

- `pnpm run fetch-schema`: Download the latest OpenAPI schema
- `pnpm run generate`: Generate TypeScript types from schema
- `pnpm run build`: Complete build process (fetch + generate + copy)
- `pnpm run watch`: Watch backend for changes and auto-regenerate
- `pnpm run clean`: Clean generated files

## Integration with Frontend

### Option 1: Local Package (Recommended for development)
```bash
cd frontend
pnpm install ../type-generator
```

### Option 2: Build and Copy
```bash
# After building types
cp -r dist/* ../frontend/src/types/generated/
```

## Generated Types Include

- **DTOs**: All request/response data transfer objects
- **Models**: Database model interfaces  
- **API Clients**: Ready-to-use Axios-based API clients
- **Common Types**: Shared interfaces like `ApiResponse`, `PaginatedResponse`
- **Utility Types**: Helper types for common patterns

## Example Generated Types

```typescript
// Menu item creation
interface CreateMenuItemRequest {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images?: string[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  // ... all properties with correct types
}

// API response wrapper
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Filters for menu items
interface MenuFilters {
  search?: string;
  categoryId?: string;
  isVegetarian?: boolean;
  // ... all filter options
}
```

## Architecture

```
type-generator/
├── package.json          # Dependencies and scripts
├── scripts/
│   └── copy-types.js     # Post-processing script
├── generated/            # Raw generated types (auto-created)
├── dist/                 # Processed types ready for use
│   ├── index.ts         # Main export file
│   ├── models/          # All model interfaces
│   └── api.ts           # API client classes
└── openapi.json         # Downloaded API schema
```

## Troubleshooting

### Backend Not Running
Make sure your backend is running on `http://localhost:3000` before generating types.

### CORS Issues
If you encounter CORS issues, you can manually download the schema:
```bash
curl -o openapi.json http://localhost:3000/api/docs-json
npm run generate
```

### Type Conflicts
If you have existing types, consider renaming them or using the generated types as the source of truth.
