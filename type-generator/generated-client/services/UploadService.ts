/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileUploadResponseDto } from '../models/FileUploadResponseDto';
import type { MultipleFileUploadResponseDto } from '../models/MultipleFileUploadResponseDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UploadService {
    /**
     * Upload single image for menu item (admin only)
     * @param id Menu item ID
     * @returns FileUploadResponseDto Image uploaded successfully
     * @throws ApiError
     */
    public static uploadControllerUploadMenuItemImage(
        id: string,
    ): CancelablePromise<FileUploadResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/upload/menu-item/{id}/image',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request - invalid file or menu item not found`,
                403: `Forbidden - admin access required`,
            },
        });
    }
    /**
     * Delete menu item image (admin only)
     * @param id Menu item ID
     * @param imageUrl Image URL to delete
     * @returns any Image deleted successfully
     * @throws ApiError
     */
    public static uploadControllerDeleteMenuItemImage(
        id: string,
        imageUrl: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/upload/menu-item/{id}/image',
            path: {
                'id': id,
            },
            query: {
                'imageUrl': imageUrl,
            },
            errors: {
                403: `Forbidden - admin access required`,
                404: `Menu item or image not found`,
            },
        });
    }
    /**
     * Upload multiple images for menu item (admin only)
     * @param id Menu item ID
     * @returns MultipleFileUploadResponseDto Images uploaded successfully
     * @throws ApiError
     */
    public static uploadControllerUploadMenuItemImages(
        id: string,
    ): CancelablePromise<MultipleFileUploadResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/upload/menu-item/{id}/images',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request - invalid files or menu item not found`,
                403: `Forbidden - admin access required`,
            },
        });
    }
    /**
     * Upload image for category (admin only)
     * @param id Category ID
     * @returns FileUploadResponseDto Category image uploaded successfully
     * @throws ApiError
     */
    public static uploadControllerUploadCategoryImage(
        id: string,
    ): CancelablePromise<FileUploadResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/upload/category/{id}/image',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad request - invalid file or category not found`,
                403: `Forbidden - admin access required`,
            },
        });
    }
    /**
     * Delete category image (admin only)
     * @param id Category ID
     * @returns any Image deleted successfully
     * @throws ApiError
     */
    public static uploadControllerDeleteCategoryImage(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/upload/category/{id}/image',
            path: {
                'id': id,
            },
            errors: {
                403: `Forbidden - admin access required`,
                404: `Category not found`,
            },
        });
    }
    /**
     * Upload restaurant logo (admin only)
     * @returns FileUploadResponseDto Restaurant logo uploaded successfully
     * @throws ApiError
     */
    public static uploadControllerUploadRestaurantLogo(): CancelablePromise<FileUploadResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/upload/restaurant/logo',
            errors: {
                400: `Bad request - invalid file`,
                403: `Forbidden - admin access required`,
            },
        });
    }
    /**
     * Delete restaurant logo (admin only)
     * @returns any Logo deleted successfully
     * @throws ApiError
     */
    public static uploadControllerDeleteRestaurantLogo(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/upload/restaurant/logo',
            errors: {
                403: `Forbidden - admin access required`,
                404: `Restaurant not found`,
            },
        });
    }
    /**
     * Upload restaurant images (admin only)
     * @returns MultipleFileUploadResponseDto Restaurant images uploaded successfully
     * @throws ApiError
     */
    public static uploadControllerUploadRestaurantImages(): CancelablePromise<MultipleFileUploadResponseDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/upload/restaurant/images',
            errors: {
                400: `Bad request - invalid files`,
                403: `Forbidden - admin access required`,
            },
        });
    }
    /**
     * Delete restaurant image (admin only)
     * @param imageUrl Image URL to delete
     * @returns any Image deleted successfully
     * @throws ApiError
     */
    public static uploadControllerDeleteRestaurantImage(
        imageUrl: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/upload/restaurant/image',
            query: {
                'imageUrl': imageUrl,
            },
            errors: {
                403: `Forbidden - admin access required`,
                404: `Restaurant or image not found`,
            },
        });
    }
    /**
     * Get file information
     * @param type Upload type (menu, restaurant, categories)
     * @param filename File name
     * @returns any File information retrieved successfully
     * @throws ApiError
     */
    public static uploadControllerGetFileInfo(
        type: string,
        filename: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/upload/info/{type}/{filename}',
            path: {
                'type': type,
                'filename': filename,
            },
            errors: {
                404: `File not found`,
            },
        });
    }
}
