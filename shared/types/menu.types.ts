export interface MenuItem {
  _id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isSpicy: boolean;
  allergens: string[];
  ingredients: string[];
  nutritionalInfo?: NutritionalInfo;
  isAvailable: boolean;
  preparationTime: number; // in minutes
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface NutritionalInfo {
  calories: number;
  protein: number; // in grams
  carbohydrates: number; // in grams
  fat: number; // in grams
  fiber: number; // in grams
  sodium: number; // in milligrams
}

export interface MenuCategory {
  _id: string;
  restaurantId: string;
  name: string;
  description?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMenuItemDto {
  name: string;
  description: string;
  price: number;
  category: string;
  images?: string[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  allergens?: string[];
  ingredients?: string[];
  nutritionalInfo?: NutritionalInfo;
  preparationTime?: number;
}

export interface UpdateMenuItemDto {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  images?: string[];
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isSpicy?: boolean;
  allergens?: string[];
  ingredients?: string[];
  nutritionalInfo?: NutritionalInfo;
  isAvailable?: boolean;
  preparationTime?: number;
}

export interface CreateCategoryDto {
  name: string;
  description?: string;
  sortOrder?: number;
}

export interface UpdateCategoryDto {
  name?: string;
  description?: string;
  sortOrder?: number;
  isActive?: boolean;
}

export interface MenuSearchQuery {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isAvailable?: boolean;
}

export interface MenuItemReview {
  _id: string;
  menuItemId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
