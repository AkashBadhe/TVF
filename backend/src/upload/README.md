# File Upload System

This module handles file uploads for the restaurant application, supporting images for menu items, categories, and restaurant branding.

## Features

- **Secure File Upload**: Admin-only access with JWT authentication
- **Image Validation**: Supports JPG, JPEG, PNG, GIF, WebP formats
- **File Size Limits**: Maximum 5MB per file
- **Multiple Upload Types**: Menu items, categories, restaurant logo/images
- **Database Integration**: Automatic URL storage in respective schemas
- **File Management**: Upload, delete, and serve static files
- **Error Handling**: Proper cleanup on failed uploads

## Upload Endpoints

### Menu Item Images
- `POST /upload/menu-item/:id/image` - Upload single image
- `POST /upload/menu-item/:id/images` - Upload multiple images
- `DELETE /upload/menu-item/:id/image?imageUrl=...` - Delete specific image

### Category Images
- `POST /upload/category/:id/image` - Upload category image
- `DELETE /upload/category/:id/image` - Delete category image

### Restaurant Branding
- `POST /upload/restaurant/logo` - Upload restaurant logo
- `POST /upload/restaurant/images` - Upload restaurant gallery images
- `DELETE /upload/restaurant/logo` - Delete restaurant logo
- `DELETE /upload/restaurant/image?imageUrl=...` - Delete specific restaurant image

### File Services
- `GET /uploads/:type/:filename` - Serve static files
- `GET /upload/info/:type/:filename` - Get file metadata

## Usage Examples

### Upload Menu Item Image (Admin)
```bash
curl -X POST "http://localhost:3000/upload/menu-item/MENU_ITEM_ID/image" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -F "image=@path/to/image.jpg"
```

### Upload Restaurant Logo (Admin)
```bash
curl -X POST "http://localhost:3000/upload/restaurant/logo" \
  -H "Authorization: Bearer ADMIN_JWT_TOKEN" \
  -F "logo=@path/to/logo.png"
```

### Access Uploaded File
```
GET http://localhost:3000/uploads/menu/filename.jpg
```

## File Structure

```
backend/
├── uploads/
│   ├── menu/           # Menu item images
│   ├── categories/     # Category images
│   └── restaurant/     # Restaurant logo and images
└── src/upload/
    ├── config/
    │   └── multer.config.ts    # Upload configuration
    ├── dto/
    │   ├── file-upload-response.dto.ts
    │   └── index.ts
    ├── upload.controller.ts    # Upload endpoints
    ├── upload.service.ts       # Upload business logic
    └── upload.module.ts        # Module configuration
```

## Configuration

### Environment Variables
```bash
BASE_URL=http://localhost:3000  # Base URL for file URLs
```

### Upload Settings
- **File Size Limit**: 5MB
- **Allowed Formats**: jpg, jpeg, png, gif, webp
- **Storage**: Local file system (can be extended to cloud storage)

## Security

- **Authentication**: JWT required for all upload operations
- **Authorization**: Admin role required for all upload operations
- **File Validation**: Strict image format validation
- **Size Limits**: Prevents large file uploads
- **Path Security**: Prevents directory traversal attacks

## Integration

The upload system automatically integrates with:
- **MenuItem Schema**: Updates `images` array
- **Category Schema**: Updates `image` field
- **Restaurant Schema**: Updates `logo` and `images` fields

## Testing

Use the Swagger UI at `http://localhost:3000/api` to test upload endpoints with proper authentication.
