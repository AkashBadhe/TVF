import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type OrderDocument = Order & Document;

export enum OrderStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  PREPARING = 'preparing',
  READY = 'ready',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export enum OrderType {
  PICKUP = 'pickup',
  DELIVERY = 'delivery',
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
  ONLINE = 'online',
}

@Schema({ timestamps: true })
export class Order {
  @Prop({ required: true, unique: true })
  orderNumber: string;

  @Prop({
    type: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    required: true,
  })
  customerInfo: {
    name: string;
    phone: string;
    email: string;
  };

  @Prop({
    type: [
      {
        menuItemId: { type: Types.ObjectId, ref: 'MenuItem', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        specialInstructions: { type: String },
      },
    ],
    required: true,
  })
  items: {
    menuItemId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    specialInstructions?: string;
  }[];

  @Prop({ required: true, min: 0 })
  subtotal: number;

  @Prop({ required: true, min: 0 })
  tax: number;

  @Prop({ default: 0 })
  deliveryFee: number;

  @Prop({ required: true, min: 0 })
  total: number;

  @Prop({ enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Prop({ enum: OrderType, required: true })
  orderType: OrderType;

  @Prop({ enum: PaymentMethod, required: true })
  paymentMethod: PaymentMethod;

  @Prop({
    type: {
      street: { type: String },
      city: { type: String },
      zipCode: { type: String },
      instructions: { type: String },
    },
    required: function() {
      return this.orderType === OrderType.DELIVERY;
    },
  })
  deliveryAddress: {
    street: string;
    city: string;
    zipCode: string;
    instructions?: string;
  };

  @Prop()
  specialInstructions: string;

  @Prop()
  estimatedDeliveryTime: Date;

  @Prop()
  actualDeliveryTime: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
