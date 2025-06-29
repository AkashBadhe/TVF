# Food Ordering App

A full-stack food ordering application built with Angular frontend and NestJS backend, using MongoDB as the database.

## 🚀 Tech Stack

### Backend (NestJS)
- **Framework**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with Passport.js
- **Validation**: class-validator and class-transformer
- **File Upload**: Multer for food images
- **Payment**: Stripe integration
- **Email**: Nodemailer for order confirmations
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest

### Frontend (Angular)
- **Framework**: Angular 17+ with TypeScript
- **UI Library**: Angular Material or PrimeNG
- **State Management**: NgRx (for complex state) or simple services
- **HTTP Client**: Angular HttpClient with interceptors
- **Forms**: Reactive Forms
- **Maps**: Google Maps API for delivery locations
- **PWA**: Angular Service Worker for offline capabilities
- **Testing**: Jasmine and Karma

### DevOps & Tools
- **Package Manager**: npm or yarn
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git
- **Environment**: Docker for containerization
- **Deployment**: Vercel/Netlify for frontend, Railway/Render for backend

## 🎯 Key Features

### User Features
- ✅ User registration and authentication
- ✅ Browse restaurants and menu items
- ✅ Search and filter functionality
- ✅ Shopping cart management
- ✅ Order placement and tracking
- ✅ Payment processing (Stripe)
- ✅ Order history
- ✅ User profile management
- ✅ Reviews and ratings
- ✅ Real-time order updates

### Restaurant/Admin Features
- ✅ Restaurant profile management
- ✅ Menu item management (CRUD)
- ✅ Order management
- ✅ Analytics dashboard
- ✅ Customer management
- ✅ Payment tracking

### Additional Features
- ✅ Real-time notifications
- ✅ Delivery tracking with maps
- ✅ Multi-language support
- ✅ Responsive design
- ✅ PWA capabilities
- ✅ Email notifications

## 📁 Project Structure

```
food-ordering-app/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── restaurants/    # Restaurant management
│   │   ├── menu/           # Menu items
│   │   ├── orders/         # Order management
│   │   ├── payments/       # Payment processing
│   │   ├── common/         # Shared utilities
│   │   └── main.ts         # Application entry point
│   ├── test/               # Test files
│   └── package.json
├── frontend/               # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/       # Authentication components
│   │   │   ├── restaurants/# Restaurant browsing
│   │   │   ├── cart/       # Shopping cart
│   │   │   ├── orders/     # Order management
│   │   │   ├── shared/     # Shared components
│   │   │   └── core/       # Core services
│   │   ├── assets/         # Static assets
│   │   └── environments/   # Environment configs
│   └── package.json
├── shared/                 # Shared TypeScript interfaces
│   └── types/              # Common type definitions
├── docker-compose.yml      # Docker configuration
├── .gitignore
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)
- Angular CLI

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run start:dev
```

### Frontend Setup
```bash
cd frontend
npm install
ng serve
```

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update the connection string in your `.env` file
3. Run database migrations (if any)

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
MONGODB_URI=mongodb://localhost:27017/food-ordering-app
DATABASE_NAME=food_ordering_app

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRATION=7d

# Stripe
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-webhook-secret

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Google Maps
GOOGLE_MAPS_API_KEY=your-google-maps-api-key

# File Upload
MAX_FILE_SIZE=5MB
UPLOAD_DIR=./uploads
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  stripePublishableKey: 'your-stripe-publishable-key',
  googleMapsApiKey: 'your-google-maps-api-key'
};
```

## 🚀 Running the Application

### Development Mode
```bash
# Backend
cd backend
npm run start:dev

# Frontend (in a new terminal)
cd frontend
ng serve

# Access the application
# Frontend: http://localhost:4200
# Backend API: http://localhost:3000
# API Documentation: http://localhost:3000/api/docs
```

### Production Mode
```bash
# Backend
npm run build
npm run start:prod

# Frontend
ng build --prod
```

### Using Docker
```bash
docker-compose up -d
```

## 📚 API Documentation

Once the backend is running, visit `http://localhost:3000/api/docs` to view the Swagger documentation.

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm run test
npm run test:e2e
npm run test:cov
```

### Frontend Tests
```bash
cd frontend
ng test
ng e2e
```

## 📱 Mobile Support

The application is fully responsive and includes PWA capabilities for mobile users.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Frontend Developer**: Angular specialist
- **Backend Developer**: NestJS specialist
- **UI/UX Designer**: Design and user experience
- **DevOps Engineer**: Deployment and infrastructure

## 🔗 Links

- **Frontend Demo**: [Coming Soon]
- **Backend API**: [Coming Soon]
- **Design System**: [Coming Soon]
- **Documentation**: [Coming Soon]

## 📞 Support

For support, email support@foodorderingapp.com or join our Slack channel.

---

**Happy Coding! 🍕🚀**
