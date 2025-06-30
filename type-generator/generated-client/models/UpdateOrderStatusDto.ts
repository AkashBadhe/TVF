/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdateOrderStatusDto = {
    /**
     * New order status
     */
    status: UpdateOrderStatusDto.status;
    /**
     * Actual delivery time (for delivered status)
     */
    actualDeliveryTime?: string;
    /**
     * Estimated delivery time update
     */
    estimatedDeliveryTime?: string;
};
export namespace UpdateOrderStatusDto {
    /**
     * New order status
     */
    export enum status {
        PENDING = 'pending',
        CONFIRMED = 'confirmed',
        PREPARING = 'preparing',
        READY = 'ready',
        OUT_FOR_DELIVERY = 'out_for_delivery',
        DELIVERED = 'delivered',
        CANCELLED = 'cancelled',
    }
}

