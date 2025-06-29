// User Models
export interface User {
  _id: string;
  email: string;
  name: string;
  phone?: string;
  role?: 'customer' | 'admin'; // Added for frontend role management
  isActive: boolean;
  isEmailVerified: boolean;
  addresses: Array<{
    _id?: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Customer extends User {
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
    };
    dietary: {
      vegetarian: boolean;
      vegan: boolean;
      glutenFree: boolean;
      allergies: string[];
    };
    _id: string;
  };
}

// Auth Models
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
  phone?: string;
  address?: string;
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    customer: Customer;
  };
}

// Menu Models
export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string | Category;
  image?: string;
  isAvailable: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  spiceLevel: 'none' | 'mild' | 'medium' | 'hot' | 'extra-hot';
  preparationTime: number;
  ingredients: string[];
  allergens: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  customizations?: Array<{
    name: string;
    options: Array<{
      name: string;
      price: number;
    }>;
    required: boolean;
    maxSelections?: number;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

// Cart Models
export interface CartItem {
  menuItem: string | MenuItem;
  quantity: number;
  customizations?: Array<{
    name: string;
    selectedOptions: string[];
    additionalPrice: number;
  }>;
  specialInstructions?: string;
  itemTotal: number;
}

export interface Cart {
  id: string;
  customer: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Order Models
export interface Order {
  id: string;
  customer: string | Customer;
  items: CartItem[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'cash' | 'card' | 'online';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  contactPhone: string;
  specialInstructions?: string;
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  orderNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

// Restaurant Models
export interface Restaurant {
  id: string;
  name: string;
  description: string;
  logo?: string;
  bannerImage?: string;
  contactInfo: {
    phone: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  businessHours: Array<{
    day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';
    isOpen: boolean;
    openTime?: string;
    closeTime?: string;
  }>;
  deliverySettings: {
    isDeliveryAvailable: boolean;
    deliveryRadius: number;
    minimumOrderAmount: number;
    deliveryFee: number;
    estimatedDeliveryTime: number;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    website?: string;
  };
  cuisine: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// API Response Models
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  totalPages: number;
}

// Filter and Search Models
export interface MenuFilters {
  category?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  spiceLevel?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
}

export interface OrderFilters {
  status?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  customer?: string;
}

// File Upload Models
export interface UploadResponse {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  path: string;
  url: string;
}
