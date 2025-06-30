const fs = require('fs');
const path = require('path');

const typesFile = path.join(__dirname, '../types.d.ts');
const distDir = path.join(__dirname, '../dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy and process generated types
function copyTypes() {
  if (fs.existsSync(typesFile)) {
    // Copy the generated types file
    fs.copyFileSync(typesFile, path.join(distDir, 'types.d.ts'));
    console.log('✅ Copied types.d.ts');
  } else {
    console.error('❌ Generated types file not found');
    process.exit(1);
  }

  // Create main index.ts that exports everything and adds utility types
  createIndexFile();
}

function createIndexFile() {
  const indexContent = `// Auto-generated types for TVF Restaurant API
// Generated on: ${new Date().toISOString()}

// Import all generated types
import type { paths, components } from './types';

// Export the main API paths and components
export type { paths, components };

// Extract commonly used schemas for easier access
export type RegisterDto = components['schemas']['RegisterDto'];
export type LoginDto = components['schemas']['LoginDto'];
export type CreateMenuItemDto = components['schemas']['CreateMenuItemDto'];
export type UpdateMenuItemDto = components['schemas']['UpdateMenuItemDto'];
export type AddToCartDto = components['schemas']['AddToCartDto'];
export type CreateOrderDto = components['schemas']['CreateOrderDto'];
export type UpdateOrderStatusDto = components['schemas']['UpdateOrderStatusDto'];
export type CreateCategoryDto = components['schemas']['CreateCategoryDto'];
export type UpdateCategoryDto = components['schemas']['UpdateCategoryDto'];
export type CreateRestaurantDto = components['schemas']['CreateRestaurantDto'];
export type UpdateRestaurantDto = components['schemas']['UpdateRestaurantDto'];
export type NutritionalInfoDto = components['schemas']['NutritionalInfoDto'];
export type BusinessHoursDto = components['schemas']['BusinessHoursDto'];
export type WeeklyHoursDto = components['schemas']['WeeklyHoursDto'];
export type AddressDto = components['schemas']['AddressDto'];
export type CustomerInfoDto = components['schemas']['CustomerInfoDto'];
export type DeliveryAddressDto = components['schemas']['DeliveryAddressDto'];
export type RestaurantStatusDto = components['schemas']['RestaurantStatusDto'];
export type FileUploadResponseDto = components['schemas']['FileUploadResponseDto'];
export type MultipleFileUploadResponseDto = components['schemas']['MultipleFileUploadResponseDto'];

// Convenient renamed exports for frontend
export type RegisterRequest = RegisterDto;
export type LoginRequest = LoginDto;
export type CreateMenuItemRequest = CreateMenuItemDto;
export type UpdateMenuItemRequest = UpdateMenuItemDto;
export type AddToCartRequest = AddToCartDto;
export type CreateOrderRequest = CreateOrderDto;
export type UpdateOrderStatusRequest = UpdateOrderStatusDto;
export type CreateCategoryRequest = CreateCategoryDto;
export type UpdateCategoryRequest = UpdateCategoryDto;
export type CreateRestaurantRequest = CreateRestaurantDto;
export type UpdateRestaurantRequest = UpdateRestaurantDto;

// Common response types (based on your API patterns)
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
}

// Auth response type
export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    customer?: any;
    admin?: any;
  };
}

// Menu filter types for easier frontend usage
export interface MenuFilters {
  search?: string;
  categoryId?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'name' | 'price' | 'rating' | 'preparationTime';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Order status enum for type safety
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled';

// Order type enum
export type OrderType = 'pickup' | 'delivery';

// Payment method enum  
export type PaymentMethod = 'cash' | 'card' | 'online';

// Spice level enum
export type SpiceLevel = 'none' | 'mild' | 'medium' | 'hot' | 'extra-hot';
`;

  fs.writeFileSync(path.join(distDir, 'index.ts'), indexContent);
  console.log('✅ Created index.ts with enhanced type exports');
}

// Run the copy process
try {
  copyTypes();
  console.log('🚀 Type generation completed successfully!');
} catch (error) {
  console.error('❌ Error copying types:', error);
  process.exit(1);
}
