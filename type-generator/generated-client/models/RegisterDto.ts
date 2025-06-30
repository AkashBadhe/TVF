/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type RegisterDto = {
    /**
     * Customer full name
     */
    name: string;
    /**
     * Customer email address
     */
    email: string;
    /**
     * Customer phone number
     */
    phone: string;
    /**
     * Customer password (min 8 chars, must contain uppercase, lowercase, number)
     */
    password: string;
    /**
     * Customer address (optional)
     */
    address?: string;
};

