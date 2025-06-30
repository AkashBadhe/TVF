/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateOrderDto } from '../models/CreateOrderDto';
import type { UpdateOrderStatusDto } from '../models/UpdateOrderStatusDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdersService {
    /**
     * Place a new order from cart
     * @param requestBody
     * @returns any Order placed successfully
     * @throws ApiError
     */
    public static ordersControllerPlaceOrder(
        requestBody: CreateOrderDto,
    ): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orders',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - cart empty or validation error`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Get customer orders
     * @param status Filter by order status
     * @param orderType Filter by order type
     * @param paymentMethod Filter by payment method
     * @param customerEmail Filter by customer email
     * @param orderNumber Filter by order number
     * @param dateFrom Filter orders from this date (ISO string)
     * @param dateTo Filter orders to this date (ISO string)
     * @param page Page number for pagination
     * @param limit Number of items per page
     * @param sortBy Sort field
     * @param sortOrder Sort order (asc or desc)
     * @returns any Customer orders retrieved successfully
     * @throws ApiError
     */
    public static ordersControllerGetMyOrders(
        status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled',
        orderType?: 'pickup' | 'delivery',
        paymentMethod?: 'cash' | 'card' | 'online',
        customerEmail?: string,
        orderNumber?: string,
        dateFrom?: string,
        dateTo?: string,
        page: number = 1,
        limit: number = 10,
        sortBy: string = 'createdAt',
        sortOrder: string = 'desc',
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            orders?: Array<Record<string, any>>;
            pagination?: Record<string, any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/my-orders',
            query: {
                'status': status,
                'orderType': orderType,
                'paymentMethod': paymentMethod,
                'customerEmail': customerEmail,
                'orderNumber': orderNumber,
                'dateFrom': dateFrom,
                'dateTo': dateTo,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
        });
    }
    /**
     * Get all orders (admin only)
     * @param status Filter by order status
     * @param orderType Filter by order type
     * @param paymentMethod Filter by payment method
     * @param customerEmail Filter by customer email
     * @param orderNumber Filter by order number
     * @param dateFrom Filter orders from this date (ISO string)
     * @param dateTo Filter orders to this date (ISO string)
     * @param page Page number for pagination
     * @param limit Number of items per page
     * @param sortBy Sort field
     * @param sortOrder Sort order (asc or desc)
     * @returns any All orders retrieved successfully
     * @throws ApiError
     */
    public static ordersControllerGetAllOrders(
        status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered' | 'cancelled',
        orderType?: 'pickup' | 'delivery',
        paymentMethod?: 'cash' | 'card' | 'online',
        customerEmail?: string,
        orderNumber?: string,
        dateFrom?: string,
        dateTo?: string,
        page: number = 1,
        limit: number = 10,
        sortBy: string = 'createdAt',
        sortOrder: string = 'desc',
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            orders?: Array<Record<string, any>>;
            pagination?: Record<string, any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/admin/all',
            query: {
                'status': status,
                'orderType': orderType,
                'paymentMethod': paymentMethod,
                'customerEmail': customerEmail,
                'orderNumber': orderNumber,
                'dateFrom': dateFrom,
                'dateTo': dateTo,
                'page': page,
                'limit': limit,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
            },
            errors: {
                403: `Forbidden - admin access required`,
            },
        });
    }
    /**
     * Get order statistics (admin only)
     * @returns any Order statistics retrieved successfully
     * @throws ApiError
     */
    public static ordersControllerGetOrderStats(): CancelablePromise<{
        success?: boolean;
        data?: {
            totalOrders?: number;
            pendingOrders?: number;
            completedOrders?: number;
            cancelledOrders?: number;
            todayOrders?: number;
            revenueToday?: number;
            revenueTotal?: number;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/admin/stats',
            errors: {
                403: `Forbidden - admin access required`,
            },
        });
    }
    /**
     * Track order by order number
     * @param orderNumber
     * @returns any Order found and returned
     * @throws ApiError
     */
    public static ordersControllerTrackOrder(
        orderNumber: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/track/{orderNumber}',
            path: {
                'orderNumber': orderNumber,
            },
            errors: {
                404: `Order not found`,
            },
        });
    }
    /**
     * Get order by ID
     * @param id
     * @returns any Order found and returned
     * @throws ApiError
     */
    public static ordersControllerGetOrderById(
        id: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Order not found`,
            },
        });
    }
    /**
     * Update order status (admin only)
     * @param id
     * @param requestBody
     * @returns any Order status updated successfully
     * @throws ApiError
     */
    public static ordersControllerUpdateOrderStatus(
        id: string,
        requestBody: UpdateOrderStatusDto,
    ): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/orders/{id}/status',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - invalid status transition`,
                403: `Forbidden - admin access required`,
                404: `Order not found`,
            },
        });
    }
    /**
     * Cancel order
     * @param id
     * @returns any Order cancelled successfully
     * @throws ApiError
     */
    public static ordersControllerCancelOrder(
        id: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/orders/{id}/cancel',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request - order cannot be cancelled`,
                404: `Order not found`,
            },
        });
    }
    /**
     * Cancel order (admin)
     * @param id
     * @returns any Order cancelled successfully by admin
     * @throws ApiError
     */
    public static ordersControllerAdminCancelOrder(
        id: string,
    ): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/orders/admin/{id}/cancel',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request - order cannot be cancelled`,
                403: `Forbidden - admin access required`,
                404: `Order not found`,
            },
        });
    }
}
