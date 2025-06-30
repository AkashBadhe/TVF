# Changelog

All notable changes to @tvf/api-client will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-07-01

### Added
- ✨ Initial release of @tvf/api-client NPM package
- 🎯 Complete TypeScript types generated from OpenAPI schema
- 🚀 Full API client with typed methods for all endpoints
- 📦 Multiple export options (types-only, client-only, or full package)
- 🏗️ Framework-agnostic support (Angular, React, Vue, etc.)
- 🔧 Configurable base URL and authentication
- 📚 Comprehensive documentation and usage examples
- 🔄 Auto-generation from backend OpenAPI specification

### Services Included
- AuthenticationService (login, register, profile management)
- MenuService (items, categories, search, filters)
- CartService (add, remove, update cart items)
- OrdersService (place orders, track, manage status)
- RestaurantService (info, hours, settings)
- UploadService (image uploads for menu/restaurant)

### Type Definitions
- Complete schema coverage for all DTOs
- Operation types for all API endpoints
- Utility types for common patterns
- Error response types

### Build System
- Multi-format builds (CommonJS, ESM)
- Proper TypeScript declarations
- Tree-shakeable exports
- NPM-ready package structure

---

## Development Notes

This package is auto-generated from the TVF Restaurant API OpenAPI specification. 
Do not edit generated files directly - all changes should be made to the source API.

### Updating the Package

1. Ensure backend API is running
2. Run `pnpm run build` to regenerate from latest schema
3. Update version in package.json
4. Run `pnpm publish` to release new version

### Version Strategy

- **Major (x.0.0)**: Breaking changes in API structure
- **Minor (0.x.0)**: New endpoints or non-breaking additions  
- **Patch (0.0.x)**: Bug fixes, documentation updates
