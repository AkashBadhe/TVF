import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  uri: process.env.MONGODB_URI,
  dbName: 'restaurant-db',
  options: {
    retryWrites: true,
    w: 'majority',
  },
}));
