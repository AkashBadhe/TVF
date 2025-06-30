# @tvf/api-client

[![npm version](https://badge.fury.io/js/@tvf%2Fapi-client.svg)](https://badge.fury.io/js/@tvf%2Fapi-client)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3%2B-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Auto-generated TypeScript types and API client for TVF Restaurant API. Provides complete type safety and ready-to-use API methods generated from OpenAPI specifications.

## 🚀 Features

- ✅ **Complete Type Safety** - Full TypeScript coverage for all API endpoints
- ✅ **Auto-Generated** - Always in sync with your backend API
- ✅ **Multiple Import Options** - Use types-only or full API client
- ✅ **Framework Agnostic** - Works with Angular, React, Vue, or any TypeScript project
- ✅ **IntelliSense Support** - Full autocomplete and documentation
- ✅ **Error Handling** - Typed error responses and proper error handling

## 📦 Installation

```bash
# Using pnpm (recommended)
pnpm add @tvf/api-client

# Using npm
npm install @tvf/api-client

# Using yarn
yarn add @tvf/api-client
```

### Peer Dependencies

```bash
pnpm add axios  # Required for API client methods
```

## 🎯 Usage

### Option 1: Full Package (Types + Client)

```typescript
import { AuthenticationService, MenuService, type MenuItem, type LoginRequest } from '@tvf/api-client';

// Use generated API methods with full type safety
const loginUser = async (credentials: LoginRequest) => {
  try {
    const response = await AuthenticationService.authControllerLogin(credentials);
    return response;
  } catch (error) {
    console.error('Login failed:', error);
  }
};

// Get menu items with filters
const getMenuItems = async () => {
  const items = await MenuService.menuControllerGetMenuItems({
    isVegetarian: true,
    maxPrice: 25.00
  });
  return items;
};
```

### Option 2: Types Only (Manual HTTP calls)

```typescript
import { type LoginRequest, type MenuItem, type ApiResponse } from '@tvf/api-client/types';
import axios from 'axios';

// Use types with your own HTTP client
const authService = {
  async login(credentials: LoginRequest): Promise<ApiResponse<{ token: string }>> {
    const response = await axios.post('/api/auth/login', credentials);
    return response.data;
  }
};
```

### Option 3: Client Only

```typescript
import { AuthenticationService, MenuService } from '@tvf/api-client/client';

// Just the API methods without type imports
const user = await AuthenticationService.authControllerLogin({
  email: 'user@example.com',
  password: 'password123'
});
```

## 🏗️ Framework Integration

### Angular

```typescript
// auth.service.ts
import { Injectable } from '@angular/core';
import { AuthenticationService, type LoginRequest, type ApiResponse } from '@tvf/api-client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  async login(credentials: LoginRequest) {
    return AuthenticationService.authControllerLogin(credentials);
  }
  
  async getProfile() {
    return AuthenticationService.authControllerGetProfile();
  }
}
```

### React

```typescript
// hooks/useAuth.ts
import { useState } from 'react';
import { AuthenticationService, type LoginRequest } from '@tvf/api-client';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  
  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    try {
      const result = await AuthenticationService.authControllerLogin(credentials);
      return result;
    } finally {
      setLoading(false);
    }
  };
  
  return { login, loading };
};
```

### Vue 3

```typescript
// composables/useMenu.ts
import { ref } from 'vue';
import { MenuService, type MenuItem } from '@tvf/api-client';

export const useMenu = () => {
  const items = ref<MenuItem[]>([]);
  const loading = ref(false);
  
  const loadMenuItems = async () => {
    loading.value = true;
    try {
      const response = await MenuService.menuControllerGetMenuItems();
      items.value = response.data?.items || [];
    } finally {
      loading.value = false;
    }
  };
  
  return { items, loading, loadMenuItems };
};
```

## 📚 Available Services

| Service | Description |
|---------|-------------|
| `AuthenticationService` | User registration, login, profile management |
| `MenuService` | Menu items, categories, search functionality |
| `CartService` | Shopping cart operations |
| `OrdersService` | Order placement, tracking, management |
| `RestaurantService` | Restaurant information, hours, settings |
| `UploadService` | File upload for images |

## 🎨 Type Definitions

### Common Types

```typescript
// User and Authentication
type LoginRequest = components['schemas']['LoginDto'];
type RegisterRequest = components['schemas']['RegisterDto'];

// Menu and Items  
type MenuItem = components['schemas']['CreateMenuItemDto'];
type Category = components['schemas']['CreateCategoryDto'];

// Orders
type Order = components['schemas']['CreateOrderDto'];
type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered';

// Generic API Response
type ApiResponse<T = any> = {
  success: boolean;
  data: T;
  message?: string;
};
```

## ⚙️ Configuration

### Setting Base URL

```typescript
import { OpenAPI } from '@tvf/api-client/client';

// Configure API base URL
OpenAPI.BASE = 'https://your-api-domain.com/api';

// Configure authentication
OpenAPI.TOKEN = 'your-jwt-token';
```

### Custom Axios Configuration

```typescript
import { OpenAPI } from '@tvf/api-client/client';

OpenAPI.interceptors.request.use((config) => {
  // Add custom headers
  config.headers.Authorization = `Bearer ${getToken()}`;
  return config;
});
```

## 🔄 Keeping Types Updated

The package is automatically generated from your API's OpenAPI specification. To update:

```bash
# In your backend repository
cd type-generator
pnpm run build    # Regenerates types from current API
pnpm publish      # Publishes new version to NPM
```

## 🛠️ Development

```bash
# Clone and setup
git clone <repository-url>
cd type-generator
pnpm install

# Generate types and client
pnpm run build

# Watch for backend changes
pnpm run dev
```

## 📄 License

MIT © TVF Restaurant Team

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

- 📧 Email: dev@tvf-restaurant.com
- 🐛 Issues: [GitHub Issues](https://github.com/tvf-restaurant/api-client/issues)
- 📖 Documentation: [Full API Docs](https://api.tvf-restaurant.com/docs)

---

> **Note**: This package is auto-generated. Do not edit the generated files directly. All changes should be made to the source API specification.
