# Shared Types

This directory contains TypeScript type definitions shared between the frontend and backend applications.

## Structure

- `types/` - All type definitions organized by domain
  - `common.types.ts` - Common enums and interfaces
  - `user.types.ts` - User-related types
  - `restaurant.types.ts` - Restaurant-related types
  - `menu.types.ts` - Menu and food item types
  - `order.types.ts` - Order and cart types

## Usage

These types can be imported and used in both frontend and backend projects to ensure type safety and consistency across the application.

```typescript
import { User, Order, MenuItem } from '../shared/types';
```
