import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CustomerDocument = Customer & Document;

@Schema({ timestamps: true })
export class Customer {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({
    type: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        zipCode: { type: String, required: true },
        isDefault: { type: Boolean, default: false },
      },
    ],
    default: [],
  })
  addresses: {
    street: string;
    city: string;
    zipCode: string;
    isDefault: boolean;
  }[];

  @Prop({
    type: {
      notifications: {
        email: { type: Boolean, default: true },
        sms: { type: Boolean, default: false },
      },
      dietary: {
        vegetarian: { type: Boolean, default: false },
        vegan: { type: Boolean, default: false },
        glutenFree: { type: Boolean, default: false },
        allergies: { type: [String], default: [] },
      },
    },
    default: {
      notifications: { email: true, sms: false },
      dietary: { vegetarian: false, vegan: false, glutenFree: false, allergies: [] },
    },
  })
  preferences: {
    notifications: {
      email: boolean;
      sms: boolean;
    };
    dietary: {
      vegetarian: boolean;
      vegan: boolean;
      glutenFree: boolean;
      allergies: string[];
    };
  };

  @Prop()
  lastLoginAt: Date;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

// Add virtual id field
CustomerSchema.virtual('id').get(function (this: CustomerDocument) {
  return (this._id as any).toHexString();
});

// Ensure virtual fields are serialized
CustomerSchema.set('toJSON', {
  virtuals: true,
  transform: function (doc, ret) {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});
