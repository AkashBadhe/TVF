/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustomerInfoDto } from './CustomerInfoDto';
import type { DeliveryAddressDto } from './DeliveryAddressDto';
export type CreateOrderDto = {
    /**
     * Customer information
     */
    customerInfo: CustomerInfoDto;
    /**
     * Order type (pickup or delivery)
     */
    orderType: CreateOrderDto.orderType;
    /**
     * Payment method
     */
    paymentMethod: CreateOrderDto.paymentMethod;
    /**
     * Delivery address (required for delivery orders)
     */
    deliveryAddress?: DeliveryAddressDto;
    /**
     * Special instructions for the order
     */
    specialInstructions?: string;
    /**
     * Estimated delivery time
     */
    estimatedDeliveryTime?: string;
};
export namespace CreateOrderDto {
    /**
     * Order type (pickup or delivery)
     */
    export enum orderType {
        PICKUP = 'pickup',
        DELIVERY = 'delivery',
    }
    /**
     * Payment method
     */
    export enum paymentMethod {
        CASH = 'cash',
        CARD = 'card',
        ONLINE = 'online',
    }
}

