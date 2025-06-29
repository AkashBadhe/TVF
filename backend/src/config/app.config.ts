import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:4200',
  
  // JWT Configuration
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback-secret-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  // Restaurant Configuration
  restaurant: {
    name: process.env.RESTAURANT_NAME || 'Restaurant Name',
    deliveryFee: parseFloat(process.env.DELIVERY_FEE || '3.99'),
    minimumOrder: parseFloat(process.env.MINIMUM_ORDER || '15.00'),
    taxRate: parseFloat(process.env.TAX_RATE || '0.1'),
  },

  // File Upload Configuration
  upload: {
    maxFileSize: process.env.MAX_FILE_SIZE || '5MB',
    uploadDir: process.env.UPLOAD_DIR || './uploads',
  },
}));
