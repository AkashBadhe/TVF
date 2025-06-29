# Single Restaurant API Specification

## Overview
This API is designed for a single restaurant website with menu browsing, cart management, and order placement functionality.

## Base URL
```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication
- **Customer Auth**: JWT token in Authorization header
- **Admin Auth**: JWT token with admin role

---

## 1. Menu Management

### GET /api/menu
Get all menu items with optional pagination and filters

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `category` (string): Filter by category ID
- `search` (string): Search in name/description
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `isVegetarian` (boolean): Filter vegetarian items
- `isVegan` (boolean): Filter vegan items
- `isAvailable` (boolean): Filter available items

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "64f5a1b2c3d4e5f6a7b8c9d0",
        "name": "Margherita Pizza",
        "description": "Fresh tomatoes, mozzarella, basil",
        "price": 12.99,
        "category": {
          "id": "64f5a1b2c3d4e5f6a7b8c9d1",
          "name": "Pizza"
        },
        "images": ["pizza-margherita.jpg"],
        "isVegetarian": true,
        "isVegan": false,
        "isAvailable": true,
        "preparationTime": 15,
        "allergens": ["dairy", "gluten"]
      }
    ],
    "total": 45,
    "page": 1,
    "totalPages": 3
  }
}
```

### GET /api/menu/categories
Get all menu categories

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "64f5a1b2c3d4e5f6a7b8c9d1",
      "name": "Pizza",
      "description": "Authentic Italian pizzas",
      "sortOrder": 1,
      "itemCount": 12
    }
  ]
}
```

### POST /api/menu (Admin Only)
Create new menu item

**Request Body:**
```json
{
  "name": "Pepperoni Pizza",
  "description": "Classic pepperoni with cheese",
  "price": 14.99,
  "categoryId": "64f5a1b2c3d4e5f6a7b8c9d1",
  "images": ["pepperoni-pizza.jpg"],
  "isVegetarian": false,
  "isVegan": false,
  "preparationTime": 18,
  "allergens": ["dairy", "gluten"],
  "ingredients": ["pepperoni", "cheese", "tomato sauce"]
}
```

---

## 2. Cart Management

### GET /api/cart
Get current cart items

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "menuItemId": "64f5a1b2c3d4e5f6a7b8c9d0",
        "name": "Margherita Pizza",
        "price": 12.99,
        "quantity": 2,
        "subtotal": 25.98,
        "specialInstructions": "Extra cheese"
      }
    ],
    "subtotal": 25.98,
    "tax": 2.60,
    "total": 28.58,
    "itemCount": 2
  }
}
```

### POST /api/cart/add
Add item to cart

**Request Body:**
```json
{
  "menuItemId": "64f5a1b2c3d4e5f6a7b8c9d0",
  "quantity": 2,
  "specialInstructions": "Extra cheese"
}
```

### PUT /api/cart/update/:itemId
Update cart item quantity

**Request Body:**
```json
{
  "quantity": 3
}
```

---

## 3. Order Management

### POST /api/orders
Place new order

**Request Body:**
```json
{
  "customerInfo": {
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com"
  },
  "deliveryAddress": {
    "street": "123 Main St",
    "city": "New York",
    "zipCode": "10001"
  },
  "orderType": "delivery", // or "pickup"
  "paymentMethod": "card", // or "cash"
  "specialInstructions": "Please ring doorbell",
  "items": [
    {
      "menuItemId": "64f5a1b2c3d4e5f6a7b8c9d0",
      "quantity": 2,
      "specialInstructions": "Extra cheese"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "orderId": "ORD-20250629-001",
    "status": "pending",
    "estimatedTime": 30,
    "total": 28.58,
    "paymentStatus": "pending"
  }
}
```

### GET /api/orders/:id
Get order details

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "64f5a1b2c3d4e5f6a7b8c9d0",
    "orderNumber": "ORD-20250629-001",
    "status": "preparing",
    "orderType": "delivery",
    "items": [...],
    "subtotal": 25.98,
    "tax": 2.60,
    "total": 28.58,
    "customerInfo": {...},
    "deliveryAddress": {...},
    "createdAt": "2025-06-29T10:30:00Z",
    "estimatedDeliveryTime": "2025-06-29T11:00:00Z"
  }
}
```

---

## 4. Restaurant Information

### GET /api/restaurant/info
Get restaurant details

**Response:**
```json
{
  "success": true,
  "data": {
    "name": "Mario's Pizza",
    "description": "Authentic Italian cuisine since 1985",
    "address": {
      "street": "456 Restaurant Ave",
      "city": "New York",
      "zipCode": "10002"
    },
    "phone": "+1234567890",
    "email": "info@mariospizza.com",
    "hours": {
      "monday": { "open": "11:00", "close": "22:00" },
      "tuesday": { "open": "11:00", "close": "22:00" },
      "wednesday": { "open": "11:00", "close": "22:00" },
      "thursday": { "open": "11:00", "close": "22:00" },
      "friday": { "open": "11:00", "close": "23:00" },
      "saturday": { "open": "11:00", "close": "23:00" },
      "sunday": { "open": "12:00", "close": "21:00" }
    },
    "deliveryFee": 3.99,
    "minimumOrder": 15.00,
    "isOpen": true,
    "logo": "mario-logo.png"
  }
}
```

---

## 5. Customer Authentication

### POST /api/customers/register
Register new customer

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "password": "securePassword123"
}
```

### POST /api/customers/login
Customer login

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "customer": {
      "id": "64f5a1b2c3d4e5f6a7b8c9d0",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890"
    }
  }
}
```

---

## 6. Search and Filter

### GET /api/menu/search
Search menu items

**Query Parameters:**
- `q` (string): Search query
- `category` (string): Category filter
- `minPrice` (number): Min price
- `maxPrice` (number): Max price
- `dietary` (string): "vegetarian", "vegan", "gluten-free"

**Example:**
```
GET /api/menu/search?q=pizza&minPrice=10&maxPrice=20&dietary=vegetarian
```

---

## Error Responses

All endpoints return errors in this format:
```json
{
  "success": false,
  "error": "Error message",
  "statusCode": 400
}
```

## Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error
