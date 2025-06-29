import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ default: 0 })
  sortOrder: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  image: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

// Add virtual id field
CategorySchema.virtual('id').get(function (this: CategoryDocument) {
  return (this._id as any).toHexString();
});

// Ensure virtual fields are serialized
CategorySchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
