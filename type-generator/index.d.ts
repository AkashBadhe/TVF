// TypeScript declarations for TVF API client

// Export all services
export { AuthenticationService } from './generated-client/services/AuthenticationService';
export { MenuService } from './generated-client/services/MenuService';
export { CartService } from './generated-client/services/CartService';
export { OrdersService } from './generated-client/services/OrdersService';
export { RestaurantService } from './generated-client/services/RestaurantService';
export { UploadService } from './generated-client/services/UploadService';

// Export core utilities
export { OpenAPI } from './generated-client/core/OpenAPI';
export { ApiError } from './generated-client/core/ApiError';
export { CancelablePromise } from './generated-client/core/CancelablePromise';

// Export commonly used models/types
export type { LoginDto } from './generated-client/models/LoginDto';
export type { RegisterDto } from './generated-client/models/RegisterDto';
export type { AddToCartDto } from './generated-client/models/AddToCartDto';
export type { UpdateCartItemDto } from './generated-client/models/UpdateCartItemDto';
export type { CreateOrderDto } from './generated-client/models/CreateOrderDto';
export type { CreateMenuItemDto } from './generated-client/models/CreateMenuItemDto';
export type { UpdateMenuItemDto } from './generated-client/models/UpdateMenuItemDto';
export type { CreateCategoryDto } from './generated-client/models/CreateCategoryDto';
export type { UpdateCategoryDto } from './generated-client/models/UpdateCategoryDto';

// Re-export all generated types
export * from './types';
