/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { FileUploadResponseDto } from './FileUploadResponseDto';
export type MultipleFileUploadResponseDto = {
    /**
     * Upload success status
     */
    success: boolean;
    /**
     * Uploaded files information
     */
    files: Array<FileUploadResponseDto>;
    /**
     * Upload message
     */
    message: string;
};

