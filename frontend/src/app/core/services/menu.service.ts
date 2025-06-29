import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
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
  private readonly apiUrl = `${environment.apiUrl}/menu`;

  constructor(private http: HttpClient) {}

  // Menu Items
  getMenuItems(
    page: number = 1,
    limit: number = 10,
    filters?: MenuFilters
  ): Observable<ApiResponse<PaginatedResponse<MenuItem>>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters) {
      if (filters.category) params = params.set('category', filters.category);
      if (filters.isVegetarian !== undefined) params = params.set('isVegetarian', filters.isVegetarian.toString());
      if (filters.isVegan !== undefined) params = params.set('isVegan', filters.isVegan.toString());
      if (filters.isGlutenFree !== undefined) params = params.set('isGlutenFree', filters.isGlutenFree.toString());
      if (filters.spiceLevel) params = params.set('spiceLevel', filters.spiceLevel);
      if (filters.search) params = params.set('search', filters.search);
      if (filters.priceRange) {
        params = params.set('minPrice', filters.priceRange.min.toString());
        params = params.set('maxPrice', filters.priceRange.max.toString());
      }
    }

    return this.http.get<ApiResponse<PaginatedResponse<MenuItem>>>(this.apiUrl, { params });
  }

  getMenuItem(id: string): Observable<ApiResponse<MenuItem>> {
    return this.http.get<ApiResponse<MenuItem>>(`${this.apiUrl}/${id}`);
  }

  searchMenuItems(query: string): Observable<ApiResponse<MenuItem[]>> {
    const params = new HttpParams().set('search', query);
    return this.http.get<ApiResponse<MenuItem[]>>(`${this.apiUrl}/search`, { params });
  }

  // Categories
  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/categories`);
  }

  getCategory(id: string): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.apiUrl}/categories/${id}`);
  }

  getMenuItemsByCategory(categoryId: string): Observable<ApiResponse<MenuItem[]>> {
    return this.http.get<ApiResponse<MenuItem[]>>(`${this.apiUrl}/categories/${categoryId}/items`);
  }

  // Admin Methods
  createMenuItem(menuItem: Partial<MenuItem>): Observable<ApiResponse<MenuItem>> {
    return this.http.post<ApiResponse<MenuItem>>(this.apiUrl, menuItem);
  }

  updateMenuItem(id: string, menuItem: Partial<MenuItem>): Observable<ApiResponse<MenuItem>> {
    return this.http.put<ApiResponse<MenuItem>>(`${this.apiUrl}/${id}`, menuItem);
  }

  deleteMenuItem(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/${id}`);
  }

  createCategory(category: Partial<Category>): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(`${this.apiUrl}/categories`, category);
  }

  updateCategory(id: string, category: Partial<Category>): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(`${this.apiUrl}/categories/${id}`, category);
  }

  deleteCategory(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/categories/${id}`);
  }
}
