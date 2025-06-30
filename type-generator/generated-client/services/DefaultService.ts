/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * @returns any
     * @throws ApiError
     */
    public static appControllerGetHello(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public static appControllerGetHealth(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/health',
        });
    }
    /**
     * Serve uploaded files
     * @param type Upload type (menu, restaurant, categories)
     * @param filename File name
     * @returns any File served successfully
     * @throws ApiError
     */
    public static staticFilesControllerServeFile(
        type: string,
        filename: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/uploads/{type}/{filename}',
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
