import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MenuItemDocument = MenuItem & Document;

@Schema({ timestamps: true })
export class MenuItem {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ type: Types.ObjectId, ref: 'Category', required: true })
  categoryId: Types.ObjectId;

  @Prop({ type: [String], default: [] })
  images: string[];

  @Prop({ default: false })
  isVegetarian: boolean;

  @Prop({ default: false })
  isVegan: boolean;

  @Prop({ default: false })
  isGlutenFree: boolean;

  @Prop({ default: false })
  isSpicy: boolean;

  @Prop({ type: [String], default: [] })
  allergens: string[];

  @Prop({ type: [String], default: [] })
  ingredients: string[];

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ default: 15 })
  preparationTime: number; // in minutes

  @Prop({ default: 0 })
  rating: number;

  @Prop({ default: 0 })
  reviewCount: number;

  @Prop({
    type: {
      calories: { type: Number },
      protein: { type: Number },
      carbohydrates: { type: Number },
      fat: { type: Number },
      fiber: { type: Number },
      sodium: { type: Number },
    },
    required: false,
  })
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbohydrates: number;
    fat: number;
    fiber: number;
    sodium: number;
  };
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);

// Add virtual id field
MenuItemSchema.virtual('id').get(function (this: MenuItemDocument) {
  return (this._id as any).toHexString();
});

// Ensure virtual fields are serialized
MenuItemSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
