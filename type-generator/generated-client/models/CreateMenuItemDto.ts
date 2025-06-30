/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NutritionalInfoDto } from './NutritionalInfoDto';
export type CreateMenuItemDto = {
    /**
     * Menu item name
     */
    name: string;
    /**
     * Menu item description
     */
    description: string;
    /**
     * Price in currency units
     */
    price: number;
    /**
     * Category ID
     */
    categoryId: string;
    /**
     * Array of image URLs
     */
    images?: Array<string>;
    /**
     * Is vegetarian
     */
    isVegetarian?: boolean;
    /**
     * Is vegan
     */
    isVegan?: boolean;
    /**
     * Is gluten free
     */
    isGlutenFree?: boolean;
    /**
     * Is spicy
     */
    isSpicy?: boolean;
    /**
     * List of allergens
     */
    allergens?: Array<string>;
    /**
     * List of ingredients
     */
    ingredients?: Array<string>;
    /**
     * Is available for order
     */
    isAvailable?: boolean;
    /**
     * Preparation time in minutes
     */
    preparationTime?: number;
    /**
     * Nutritional information
     */
    nutritionalInfo?: NutritionalInfoDto;
};

