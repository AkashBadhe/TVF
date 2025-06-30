import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { 
  CartService as GeneratedCartService,
  type AddToCartDto,
  type UpdateCartItemDto
} from '@tvf/api-client';
import {
  Cart,
  CartItem,
  ApiResponse
} from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {}

  getCart(): Observable<any> {
    return from(GeneratedCartService.cartControllerGetCart());
  }

  addToCart(item: AddToCartDto): Observable<any> {
    return from(GeneratedCartService.cartControllerAddToCart(item));
  }

  updateCartItem(itemIndex: string, updates: UpdateCartItemDto): Observable<any> {
    return from(GeneratedCartService.cartControllerUpdateCartItem(itemIndex, updates));
  }

  removeFromCart(itemIndex: string): Observable<any> {
    return from(GeneratedCartService.cartControllerRemoveFromCart(itemIndex));
  }

  clearCart(): Observable<any> {
    return from(GeneratedCartService.cartControllerClearCart());
  }

  validateCart(): Observable<any> {
    return from(GeneratedCartService.cartControllerValidateCart());
  }

  // Admin methods
  getAllCarts(): Observable<any> {
    return from(GeneratedCartService.cartControllerGetAllCarts());
  }

  getCartStats(): Observable<any> {
    return from(GeneratedCartService.cartControllerGetCartStats());
  }
}
