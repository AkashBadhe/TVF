/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateRestaurantDto } from '../models/CreateRestaurantDto';
import type { RestaurantStatusDto } from '../models/RestaurantStatusDto';
import type { UpdateRestaurantDto } from '../models/UpdateRestaurantDto';
import type { WeeklyHoursDto } from '../models/WeeklyHoursDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RestaurantService {
    /**
     * Get restaurant information (public)
     * @returns any Restaurant information retrieved successfully
     * @throws ApiError
     */
    public static restaurantControllerGetPublicInfo(): CancelablePromise<{
        success?: boolean;
        data?: {
            name?: string;
            description?: string;
            address?: Record<string, any>;
            phone?: string;
            email?: string;
            hours?: Record<string, any>;
            isOpen?: boolean;
            currentStatus?: Record<string, any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/restaurant',
            errors: {
                404: `Restaurant information not found`,
            },
        });
    }
    /**
     * Get restaurant contact information
     * @returns any Contact information retrieved successfully
     * @throws ApiError
     */
    public static restaurantControllerGetContactInfo(): CancelablePromise<{
        success?: boolean;
        data?: {
            name?: string;
            phone?: string;
            email?: string;
            address?: Record<string, any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/restaurant/contact',
        });
    }
    /**
     * Get delivery information
     * @returns any Delivery information retrieved successfully
     * @throws ApiError
     */
    public static restaurantControllerGetDeliveryInfo(): CancelablePromise<{
        success?: boolean;
        data?: {
            deliveryFee?: number;
            minimumOrder?: number;
            estimatedDeliveryTime?: string;
            deliveryRadius?: string;
            address?: Record<string, any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/restaurant/delivery-info',
        });
    }
    /**
     * Get complete restaurant information (admin only)
     * @returns any Complete restaurant information retrieved successfully
     * @throws ApiError
     */
    public static restaurantControllerGetFullInfo(): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/restaurant/admin/full',
            errors: {
                403: `Forbidden - admin access required`,
                404: `Restaurant information not found`,
            },
        });
    }
    /**
     * Get restaurant settings (admin only)
     * @returns any Restaurant settings retrieved successfully
     * @throws ApiError
     */
    public static restaurantControllerGetSettings(): CancelablePromise<{
        success?: boolean;
        data?: {
            deliveryFee?: number;
            minimumOrder?: number;
            taxRate?: number;
            isOpen?: boolean;
            hours?: Record<string, any>;
        };
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/restaurant/admin/settings',
            errors: {
                403: `Forbidden - admin access required`,
            },
        });
    }
    /**
     * Initialize restaurant information with defaults (admin only)
     * @returns any Restaurant information initialized successfully
     * @throws ApiError
     */
    public static restaurantControllerInitialize(): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/restaurant/admin/initialize',
            errors: {
                403: `Forbidden - admin access required`,
            },
        });
    }
    /**
     * Create restaurant information (admin only)
     * @param requestBody
     * @returns any Restaurant information created successfully
     * @throws ApiError
     */
    public static restaurantControllerCreate(
        requestBody: CreateRestaurantDto,
    ): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/restaurant/admin/create',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - validation error`,
                403: `Forbidden - admin access required`,
                409: `Conflict - restaurant information already exists`,
            },
        });
    }
    /**
     * Update restaurant information (admin only)
     * @param requestBody
     * @returns any Restaurant information updated successfully
     * @throws ApiError
     */
    public static restaurantControllerUpdate(
        requestBody: UpdateRestaurantDto,
    ): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/restaurant/admin/update',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - validation error`,
                403: `Forbidden - admin access required`,
                404: `Restaurant information not found`,
            },
        });
    }
    /**
     * Update restaurant open/closed status (admin only)
     * @param requestBody
     * @returns any Restaurant status updated successfully
     * @throws ApiError
     */
    public static restaurantControllerUpdateStatus(
        requestBody: RestaurantStatusDto,
    ): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/restaurant/admin/status',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                403: `Forbidden - admin access required`,
                404: `Restaurant information not found`,
            },
        });
    }
    /**
     * Update restaurant business hours (admin only)
     * @param requestBody
     * @returns any Business hours updated successfully
     * @throws ApiError
     */
    public static restaurantControllerUpdateBusinessHours(
        requestBody: WeeklyHoursDto,
    ): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/restaurant/admin/hours',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad request - validation error`,
                403: `Forbidden - admin access required`,
                404: `Restaurant information not found`,
            },
        });
    }
    /**
     * Update delivery settings (admin only)
     * @returns any Delivery settings updated successfully
     * @throws ApiError
     */
    public static restaurantControllerUpdateDeliverySettings(): CancelablePromise<{
        success?: boolean;
        data?: Record<string, any>;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/restaurant/admin/delivery-settings',
            errors: {
                400: `Bad request - validation error`,
                403: `Forbidden - admin access required`,
                404: `Restaurant information not found`,
            },
        });
    }
}
