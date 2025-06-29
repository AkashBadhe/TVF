import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CartDocument = Cart & Document;

@Schema({ timestamps: true })
export class CartItem {
  @Prop({ type: Types.ObjectId, ref: 'MenuItem', required: true })
  menuItemId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 50 })
  quantity: number;

  @Prop({ trim: true })
  specialInstructions?: string;

  @Prop({ required: true, min: 0 })
  priceAtTime: number; // Store price at time of adding to cart
}

@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: Types.ObjectId, ref: 'Customer', required: true, unique: true })
  customerId: Types.ObjectId;

  @Prop({ type: [CartItem], default: [] })
  items: CartItem[];

  @Prop({ default: 0, min: 0 })
  subtotal: number;

  @Prop({ default: 0, min: 0 })
  tax: number;

  @Prop({ default: 0, min: 0 })
  deliveryFee: number;

  @Prop({ default: 0, min: 0 })
  total: number;

  @Prop({ default: Date.now })
  lastUpdated: Date;

  @Prop({ default: false })
  isActive: boolean;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
export const CartSchema = SchemaFactory.createForClass(Cart);

// Add virtual id field
CartSchema.virtual('id').get(function (this: CartDocument) {
  return (this._id as any).toHexString();
});

// Ensure virtual fields are serialized
CartSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

// Add index for efficient cart lookups
CartSchema.index({ customerId: 1 });
CartSchema.index({ isActive: 1 });
