import { IsString, IsEnum, IsOptional, IsNotEmpty, ValidateNested, IsNumber, Min, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderType, PaymentMethod } from '../schemas/order.schema';

export class DeliveryAddressDto {
  @ApiProperty({ description: 'Street address' })
  @IsString()
  @IsNotEmpty()
  street: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ description: 'ZIP code' })
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty({ description: 'Delivery instructions', required: false })
  @IsString()
  @IsOptional()
  instructions?: string;
}

export class CustomerInfoDto {
  @ApiProperty({ description: 'Customer name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Customer phone number' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ description: 'Customer email' })
  @IsString()
  @IsNotEmpty()
  email: string;
}

export class CreateOrderDto {
  @ApiProperty({ description: 'Customer information' })
  @ValidateNested()
  @Type(() => CustomerInfoDto)
  customerInfo: CustomerInfoDto;

  @ApiProperty({ enum: OrderType, description: 'Order type (pickup or delivery)' })
  @IsEnum(OrderType)
  orderType: OrderType;

  @ApiProperty({ enum: PaymentMethod, description: 'Payment method' })
  @IsEnum(PaymentMethod)
  paymentMethod: PaymentMethod;

  @ApiProperty({ 
    type: DeliveryAddressDto, 
    description: 'Delivery address (required for delivery orders)', 
    required: false 
  })
  @ValidateNested()
  @Type(() => DeliveryAddressDto)
  @IsOptional()
  deliveryAddress?: DeliveryAddressDto;

  @ApiProperty({ description: 'Special instructions for the order', required: false })
  @IsString()
  @IsOptional()
  specialInstructions?: string;

  @ApiProperty({ description: 'Estimated delivery time', required: false })
  @IsDateString()
  @IsOptional()
  estimatedDeliveryTime?: string;
}
