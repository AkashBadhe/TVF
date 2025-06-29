import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Cart,
  CartItem,
  ApiResponse
} from '../../shared/models';

export interface AddToCartRequest {
  menuItem: string;
  quantity: number;
  customizations?: Array<{
    name: string;
    selectedOptions: string[];
    additionalPrice: number;
  }>;
  specialInstructions?: string;
}

export interface UpdateCartItemRequest {
  quantity: number;
  customizations?: Array<{
    name: string;
    selectedOptions: string[];
    additionalPrice: number;
  }>;
  specialInstructions?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly apiUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  getCart(): Observable<ApiResponse<Cart>> {
    return this.http.get<ApiResponse<Cart>>(this.apiUrl);
  }

  addToCart(item: AddToCartRequest): Observable<ApiResponse<Cart>> {
    return this.http.post<ApiResponse<Cart>>(`${this.apiUrl}/add`, item);
  }

  updateCartItem(itemId: string, updates: UpdateCartItemRequest): Observable<ApiResponse<Cart>> {
    return this.http.put<ApiResponse<Cart>>(`${this.apiUrl}/item/${itemId}`, updates);
  }

  removeFromCart(itemId: string): Observable<ApiResponse<Cart>> {
    return this.http.delete<ApiResponse<Cart>>(`${this.apiUrl}/item/${itemId}`);
  }

  clearCart(): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/clear`);
  }

  validateCart(): Observable<ApiResponse<Cart>> {
    return this.http.post<ApiResponse<Cart>>(`${this.apiUrl}/validate`, {});
  }
}
