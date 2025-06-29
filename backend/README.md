# Backend - NestJS API

This directory contains the NestJS backend API for the Food Ordering App.

## Structure

- `src/auth/` - Authentication and authorization
- `src/users/` - User management
- `src/restaurants/` - Restaurant management
- `src/menu/` - Menu items and categories
- `src/orders/` - Order processing and management
- `src/payments/` - Payment processing
- `src/common/` - Shared utilities, guards, decorators
- `test/` - Test files

## Setup

```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```

The API will be available at `http://localhost:3000`
API Documentation will be available at `http://localhost:3000/api/docs`
