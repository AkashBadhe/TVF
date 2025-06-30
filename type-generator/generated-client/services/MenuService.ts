/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateCategoryDto } from '../models/CreateCategoryDto';
import type { CreateMenuItemDto } from '../models/CreateMenuItemDto';
import type { CreateMultipleMenuItemsDto } from '../models/CreateMultipleMenuItemsDto';
import type { UpdateCategoryDto } from '../models/UpdateCategoryDto';
import type { UpdateMenuItemDto } from '../models/UpdateMenuItemDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MenuService {
    /**
     * Get all categories with item counts
     * @returns any Returns all active categories with item counts
     * @throws ApiError
     */
    public static menuControllerGetCategories(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/menu/categories',
        });
    }
    /**
     * Create a new category (Admin only)
     * @param requestBody
     * @returns any Category created successfully
     * @throws ApiError
     */
    public static menuControllerCreateCategory(
        requestBody: CreateCategoryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/menu/categories',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Get category by ID
     * @param id Category ID
     * @returns any Returns category details
     * @throws ApiError
     */
    public static menuControllerGetCategoryById(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/menu/categories/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Category not found`,
            },
        });
    }
    /**
     * Update category (Admin only)
     * @param id Category ID
     * @param requestBody
     * @returns any Category updated successfully
     * @throws ApiError
     */
    public static menuControllerUpdateCategory(
        id: string,
        requestBody: UpdateCategoryDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/menu/categories/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete category (Admin only)
     * @param id Category ID
     * @returns void
     * @throws ApiError
     */
    public static menuControllerDeleteCategory(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/menu/categories/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Get all menu items with filters and pagination
     * @param search Search term
     * @param categoryId Filter by category
     * @param isVegetarian Filter vegetarian items only
     * @param isVegan Filter vegan items only
     * @param isGlutenFree Filter gluten-free items only
     * @param isSpicy Filter spicy items only
     * @param minPrice Minimum price filter
     * @param maxPrice Maximum price filter
     * @param sortBy Sort by field
     * @param sortOrder Sort order
     * @param page Page number for pagination
     * @param limit Items per page
     * @returns any Returns paginated menu items with filters applied
     * @throws ApiError
     */
    public static menuControllerGetMenuItems(
        search?: string,
        categoryId?: string,
        isVegetarian?: boolean,
        isVegan?: boolean,
        isGlutenFree?: boolean,
        isSpicy?: boolean,
        minPrice?: number,
        maxPrice?: number,
        sortBy?: 'name' | 'price' | 'rating' | 'preparationTime',
        sortOrder?: 'asc' | 'desc',
        page: number = 1,
        limit: number = 20,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/menu',
            query: {
                'search': search,
                'categoryId': categoryId,
                'isVegetarian': isVegetarian,
                'isVegan': isVegan,
                'isGlutenFree': isGlutenFree,
                'isSpicy': isSpicy,
                'minPrice': minPrice,
                'maxPrice': maxPrice,
                'sortBy': sortBy,
                'sortOrder': sortOrder,
                'page': page,
                'limit': limit,
            },
        });
    }
    /**
     * Create a new menu item (Admin only)
     * @param requestBody
     * @returns any Menu item created successfully
     * @throws ApiError
     */
    public static menuControllerCreateMenuItem(
        requestBody: CreateMenuItemDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/menu',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Create multiple menu items at once (Admin only)
     * @param requestBody
     * @returns any Menu items created successfully
     * @throws ApiError
     */
    public static menuControllerCreateMultipleMenuItems(
        requestBody: CreateMultipleMenuItemsDto,
    ): CancelablePromise<{
        success?: boolean;
        data?: {
            created?: number;
            failed?: number;
            items?: any[];
            errors?: any[];
        };
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/menu/bulk',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Search menu items
     * @param q Search query
     * @returns any Returns search results
     * @throws ApiError
     */
    public static menuControllerSearchMenuItems(
        q: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/menu/search',
            query: {
                'q': q,
            },
        });
    }
    /**
     * Get featured menu items
     * @param limit Number of items to return
     * @returns any Returns featured items
     * @throws ApiError
     */
    public static menuControllerGetFeaturedItems(
        limit?: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/menu/featured',
            query: {
                'limit': limit,
            },
        });
    }
    /**
     * Get menu items by category
     * @param categoryId Category ID
     * @returns any Returns menu items in category
     * @throws ApiError
     */
    public static menuControllerGetMenuItemsByCategory(
        categoryId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/menu/category/{categoryId}',
            path: {
                'categoryId': categoryId,
            },
        });
    }
    /**
     * Get menu item by ID
     * @param id Menu item ID
     * @returns any Returns menu item details
     * @throws ApiError
     */
    public static menuControllerGetMenuItemById(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/menu/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Menu item not found`,
            },
        });
    }
    /**
     * Update menu item (Admin only)
     * @param id Menu item ID
     * @param requestBody
     * @returns any Menu item updated successfully
     * @throws ApiError
     */
    public static menuControllerUpdateMenuItem(
        id: string,
        requestBody: UpdateMenuItemDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/menu/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * Delete menu item (Admin only)
     * @param id Menu item ID
     * @returns void
     * @throws ApiError
     */
    public static menuControllerDeleteMenuItem(
        id: string,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/menu/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * Toggle menu item availability (Admin only)
     * @param id Menu item ID
     * @returns any Availability toggled successfully
     * @throws ApiError
     */
    public static menuControllerToggleAvailability(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/menu/{id}/toggle-availability',
            path: {
                'id': id,
            },
        });
    }
}
