/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddToCartDto } from '../models/AddToCartDto';
import type { UpdateCartItemDto } from '../models/UpdateCartItemDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CartService {
    /**
     * Get current customer cart
     * @returns any Returns customer cart with items
     * @throws ApiError
     */
    public static cartControllerGetCart(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart',
        });
    }
    /**
     * Add item to cart
     * @param requestBody
     * @returns any Item added to cart successfully
     * @throws ApiError
     */
    public static cartControllerAddToCart(
        requestBody: AddToCartDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/cart/add',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Menu item not available or invalid quantity`,
            },
        });
    }
    /**
     * Update cart item quantity and instructions
     * @param itemIndex Index of the item in cart (0-based)
     * @param requestBody
     * @returns any Cart item updated successfully
     * @throws ApiError
     */
    public static cartControllerUpdateCartItem(
        itemIndex: string,
        requestBody: UpdateCartItemDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/cart/items/{itemIndex}',
            path: {
                'itemIndex': itemIndex,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid item index or quantity`,
            },
        });
    }
    /**
     * Remove item from cart
     * @param itemIndex Index of the item in cart (0-based)
     * @returns any Item removed from cart successfully
     * @throws ApiError
     */
    public static cartControllerRemoveFromCart(
        itemIndex: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cart/items/{itemIndex}',
            path: {
                'itemIndex': itemIndex,
            },
            errors: {
                400: `Invalid item index`,
            },
        });
    }
    /**
     * Clear all items from cart
     * @returns any Cart cleared successfully
     * @throws ApiError
     */
    public static cartControllerClearCart(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/cart/clear',
        });
    }
    /**
     * Validate cart for checkout
     * @returns any Cart validation result
     * @throws ApiError
     */
    public static cartControllerValidateCart(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart/validate',
        });
    }
    /**
     * Get all active carts (Admin only)
     * @returns any Returns all active carts
     * @throws ApiError
     */
    public static cartControllerGetAllCarts(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart/admin/all',
        });
    }
    /**
     * Get cart statistics (Admin only)
     * @returns any Returns cart statistics
     * @throws ApiError
     */
    public static cartControllerGetCartStats(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/cart/admin/stats',
        });
    }
}
