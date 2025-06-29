import { Address } from './common.types';

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  address: Address;
  phone: string;
  email: string;
  ownerId: string;
  cuisine: string[];
  images: string[];
  logo?: string;
  isActive: boolean;
  rating: number;
  reviewCount: number;
  deliveryFee: number;
  minimumOrder: number;
  estimatedDeliveryTime: number; // in minutes
  openingHours: OpeningHours;
  isOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OpeningHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

export interface DaySchedule {
  isOpen: boolean;
  openTime?: string; // "09:00"
  closeTime?: string; // "22:00"
}

export interface CreateRestaurantDto {
  name: string;
  description: string;
  address: Address;
  phone: string;
  email: string;
  cuisine: string[];
  logo?: string;
  deliveryFee: number;
  minimumOrder: number;
  estimatedDeliveryTime: number;
  openingHours: OpeningHours;
}

export interface UpdateRestaurantDto {
  name?: string;
  description?: string;
  address?: Address;
  phone?: string;
  email?: string;
  cuisine?: string[];
  logo?: string;
  deliveryFee?: number;
  minimumOrder?: number;
  estimatedDeliveryTime?: number;
  openingHours?: OpeningHours;
  isActive?: boolean;
}

export interface RestaurantSearchQuery {
  search?: string;
  cuisine?: string[];
  minRating?: number;
  maxDeliveryFee?: number;
  isOpen?: boolean;
  latitude?: number;
  longitude?: number;
  radius?: number; // in kilometers
}

export interface RestaurantReview {
  _id: string;
  restaurantId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
