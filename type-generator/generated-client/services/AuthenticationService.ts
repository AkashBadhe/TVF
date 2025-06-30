/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChangePasswordDto } from '../models/ChangePasswordDto';
import type { LoginDto } from '../models/LoginDto';
import type { RegisterDto } from '../models/RegisterDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Register a new customer
     * @param requestBody
     * @returns any Customer registered successfully
     * @throws ApiError
     */
    public static authControllerRegister(
        requestBody: RegisterDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/register',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `Customer with this email already exists`,
            },
        });
    }
    /**
     * Customer login
     * @param requestBody
     * @returns any Login successful
     * @throws ApiError
     */
    public static authControllerLogin(
        requestBody: LoginDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid credentials`,
            },
        });
    }
    /**
     * Admin login
     * @param requestBody
     * @returns any Admin login successful
     * @throws ApiError
     */
    public static authControllerAdminLogin(
        requestBody: LoginDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/admin/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Invalid admin credentials`,
            },
        });
    }
    /**
     * Get current user profile
     * @returns any Profile retrieved successfully
     * @throws ApiError
     */
    public static authControllerGetProfile(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/profile',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Refresh JWT token
     * @returns any Token refreshed successfully
     * @throws ApiError
     */
    public static authControllerRefreshToken(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/refresh',
        });
    }
    /**
     * Change customer password
     * @param requestBody
     * @returns any Password changed successfully
     * @throws ApiError
     */
    public static authControllerChangePassword(
        requestBody: ChangePasswordDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/auth/change-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Current password is incorrect`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * Logout (client-side token invalidation)
     * @returns any Logout successful
     * @throws ApiError
     */
    public static authControllerLogout(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/auth/logout',
        });
    }
    /**
     * Get all customers (Admin only)
     * @returns any Customers retrieved successfully
     * @throws ApiError
     */
    public static authControllerGetAllCustomers(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/auth/admin/customers',
        });
    }
}
