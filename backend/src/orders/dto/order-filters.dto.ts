import { IsOptional, IsEnum, IsString, IsDateString, IsNumber, Min } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus, OrderType, PaymentMethod } from '../schemas/order.schema';

export class OrderFiltersDto {
  @ApiProperty({ enum: OrderStatus, description: 'Filter by order status', required: false })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiProperty({ enum: OrderType, description: 'Filter by order type', required: false })
  @IsEnum(OrderType)
  @IsOptional()
  orderType?: OrderType;

  @ApiProperty({ enum: PaymentMethod, description: 'Filter by payment method', required: false })
  @IsEnum(PaymentMethod)
  @IsOptional()
  paymentMethod?: PaymentMethod;

  @ApiProperty({ description: 'Filter by customer email', required: false })
  @IsString()
  @IsOptional()
  customerEmail?: string;

  @ApiProperty({ description: 'Filter by order number', required: false })
  @IsString()
  @IsOptional()
  orderNumber?: string;

  @ApiProperty({ description: 'Filter orders from this date (ISO string)', required: false })
  @IsDateString()
  @IsOptional()
  dateFrom?: string;

  @ApiProperty({ description: 'Filter orders to this date (ISO string)', required: false })
  @IsDateString()
  @IsOptional()
  dateTo?: string;

  @ApiProperty({ description: 'Page number for pagination', required: false, default: 1 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiProperty({ description: 'Number of items per page', required: false, default: 10 })
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @IsOptional()
  limit?: number = 10;

  @ApiProperty({ description: 'Sort field', required: false, default: 'createdAt' })
  @IsString()
  @IsOptional()
  sortBy?: string = 'createdAt';

  @ApiProperty({ description: 'Sort order (asc or desc)', required: false, default: 'desc' })
  @IsString()
  @IsOptional()
  sortOrder?: 'asc' | 'desc' = 'desc';
}
