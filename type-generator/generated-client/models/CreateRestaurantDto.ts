/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddressDto } from './AddressDto';
import type { WeeklyHoursDto } from './WeeklyHoursDto';
export type CreateRestaurantDto = {
    /**
     * Restaurant name
     */
    name: string;
    /**
     * Restaurant description
     */
    description?: string;
    /**
     * Restaurant address
     */
    address: AddressDto;
    /**
     * Phone number
     */
    phone: string;
    /**
     * Email address
     */
    email: string;
    /**
     * Business hours
     */
    hours?: WeeklyHoursDto;
    /**
     * Delivery fee
     */
    deliveryFee: number;
    /**
     * Minimum order amount
     */
    minimumOrder: number;
    /**
     * Tax rate (decimal)
     */
    taxRate: number;
    /**
     * Whether restaurant is currently open
     */
    isOpen: boolean;
    /**
     * Logo URL
     */
    logo?: string;
    /**
     * Restaurant images
     */
    images?: Array<string>;
    /**
     * Cuisine types
     */
    cuisineTypes?: Array<string>;
};

