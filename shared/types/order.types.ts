import { OrderStatus, PaymentStatus, PaymentMethod, Address } from './common.types';

export interface Order {
  _id: string;
  orderNumber: string;
  customerId: string;
  restaurantId: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  deliveryAddress: Address;
  estimatedDeliveryTime: Date;
  actualDeliveryTime?: Date;
  specialInstructions?: string;
  driverId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
  customizations?: OrderItemCustomization[];
}

export interface OrderItemCustomization {
  name: string;
  value: string;
  additionalPrice: number;
}

export interface CreateOrderDto {
  restaurantId: string;
  items: CreateOrderItemDto[];
  deliveryAddress: Address;
  paymentMethod: PaymentMethod;
  specialInstructions?: string;
}

export interface CreateOrderItemDto {
  menuItemId: string;
  quantity: number;
  specialInstructions?: string;
  customizations?: OrderItemCustomization[];
}

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  estimatedDeliveryTime?: Date;
}

export interface OrderSearchQuery {
  customerId?: string;
  restaurantId?: string;
  status?: OrderStatus;
  paymentStatus?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
}

export interface OrderTracking {
  _id: string;
  orderId: string;
  status: OrderStatus;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
  };
  notes?: string;
}

export interface CartItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  specialInstructions?: string;
  customizations?: OrderItemCustomization[];
  restaurantId: string;
}

export interface Cart {
  items: CartItem[];
  restaurantId?: string;
  subtotal: number;
  itemCount: number;
}
