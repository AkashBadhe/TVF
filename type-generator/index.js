// Auto-generated API client for TVF Restaurant
// This exports all services, models, and types

// Re-export all services
module.exports.AuthenticationService = require('./generated-client/services/AuthenticationService').AuthenticationService;
module.exports.MenuService = require('./generated-client/services/MenuService').MenuService;
module.exports.CartService = require('./generated-client/services/CartService').CartService;
module.exports.OrdersService = require('./generated-client/services/OrdersService').OrdersService;
module.exports.RestaurantService = require('./generated-client/services/RestaurantService').RestaurantService;
module.exports.UploadService = require('./generated-client/services/UploadService').UploadService;

// Re-export core utilities
module.exports.OpenAPI = require('./generated-client/core/OpenAPI').OpenAPI;
module.exports.ApiError = require('./generated-client/core/ApiError').ApiError;
module.exports.CancelablePromise = require('./generated-client/core/CancelablePromise').CancelablePromise;

// Re-export commonly used models
module.exports.LoginDto = require('./generated-client/models/LoginDto').LoginDto;
module.exports.RegisterDto = require('./generated-client/models/RegisterDto').RegisterDto;
module.exports.AddToCartDto = require('./generated-client/models/AddToCartDto').AddToCartDto;
module.exports.UpdateCartItemDto = require('./generated-client/models/UpdateCartItemDto').UpdateCartItemDto;
module.exports.CreateOrderDto = require('./generated-client/models/CreateOrderDto').CreateOrderDto;
module.exports.CreateMenuItemDto = require('./generated-client/models/CreateMenuItemDto').CreateMenuItemDto;
module.exports.UpdateMenuItemDto = require('./generated-client/models/UpdateMenuItemDto').UpdateMenuItemDto;
module.exports.CreateCategoryDto = require('./generated-client/models/CreateCategoryDto').CreateCategoryDto;
module.exports.UpdateCategoryDto = require('./generated-client/models/UpdateCategoryDto').UpdateCategoryDto;
