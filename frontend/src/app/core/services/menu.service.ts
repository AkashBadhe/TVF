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
    return from(GeneratedMenuService.menuControllerGetMenuItems(
      filters?.search,           // search
      filters?.category,         // categoryId  
      filters?.isVegetarian,     // isVegetarian
      filters?.isVegan,          // isVegan
      filters?.isGlutenFree,     // isGlutenFree
      undefined,                 // isSpicy
      filters?.priceRange?.min,  // minPrice
      filters?.priceRange?.max,  // maxPrice
      undefined,                 // sortBy
      undefined,                 // sortOrder
      page,                      // page
      limit                      // limit
    ));
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
