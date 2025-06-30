import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { 
  MenuService as GeneratedMenuService,
  type CreateMenuItemDto,
  type UpdateMenuItemDto,
  type CreateCategoryDto,
  type UpdateCategoryDto
} from '@tvf/api-client';
import {
  MenuItem,
  Category,
  ApiResponse,
  PaginatedResponse,
  MenuFilters
} from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() {}

  // Menu Items
  getMenuItems(
    page: number = 1,
    limit: number = 10,
    filters?: MenuFilters
  ): Observable<any> {
    const queryParams: any = {
      page,
      limit
    };

    if (filters) {
      if (filters.category) queryParams.categoryId = filters.category;
      if (filters.isVegetarian !== undefined) queryParams.isVegetarian = filters.isVegetarian;
      if (filters.isVegan !== undefined) queryParams.isVegan = filters.isVegan;
      if (filters.isGlutenFree !== undefined) queryParams.isGlutenFree = filters.isGlutenFree;
      if (filters.search) queryParams.search = filters.search;
      if (filters.priceRange) {
        queryParams.minPrice = filters.priceRange.min;
        queryParams.maxPrice = filters.priceRange.max;
      }
    }

    return from(GeneratedMenuService.menuControllerGetMenuItems(queryParams));
  }

  getMenuItem(id: string): Observable<any> {
    return from(GeneratedMenuService.menuControllerGetMenuItemById(id));
  }

  searchMenuItems(query: string): Observable<any> {
    return from(GeneratedMenuService.menuControllerSearchMenuItems(query));
  }

  getFeaturedItems(limit: number = 10): Observable<any> {
    return from(GeneratedMenuService.menuControllerGetFeaturedItems(limit));
  }

  // Categories
  getCategories(): Observable<any> {
    return from(GeneratedMenuService.menuControllerGetCategories());
  }

  getCategory(id: string): Observable<any> {
    return from(GeneratedMenuService.menuControllerGetCategoryById(id));
  }

  getMenuItemsByCategory(categoryId: string): Observable<any> {
    return from(GeneratedMenuService.menuControllerGetMenuItemsByCategory(categoryId));
  }

  // Admin Methods - Menu Items
  createMenuItem(menuItem: CreateMenuItemDto): Observable<any> {
    return from(GeneratedMenuService.menuControllerCreateMenuItem(menuItem));
  }

  createMultipleMenuItems(menuItems: CreateMenuItemDto[]): Observable<any> {
    return from(GeneratedMenuService.menuControllerCreateMultipleMenuItems({ items: menuItems }));
  }

  updateMenuItem(id: string, menuItem: UpdateMenuItemDto): Observable<any> {
    return from(GeneratedMenuService.menuControllerUpdateMenuItem(id, menuItem));
  }

  deleteMenuItem(id: string): Observable<any> {
    return from(GeneratedMenuService.menuControllerDeleteMenuItem(id));
  }

  toggleMenuItemAvailability(id: string): Observable<any> {
    return from(GeneratedMenuService.menuControllerToggleAvailability(id));
  }

  // Admin Methods - Categories
  createCategory(category: CreateCategoryDto): Observable<any> {
    return from(GeneratedMenuService.menuControllerCreateCategory(category));
  }

  updateCategory(id: string, category: UpdateCategoryDto): Observable<any> {
    return from(GeneratedMenuService.menuControllerUpdateCategory(id, category));
  }

  deleteCategory(id: string): Observable<any> {
    return from(GeneratedMenuService.menuControllerDeleteCategory(id));
  }
}
