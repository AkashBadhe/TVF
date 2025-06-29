import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../schemas/order.schema';

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: OrderStatus, description: 'New order status' })
  @IsEnum(OrderStatus)
  status: OrderStatus;

  @ApiProperty({ description: 'Actual delivery time (for delivered status)', required: false })
  @IsDateString()
  @IsOptional()
  actualDeliveryTime?: string;

  @ApiProperty({ description: 'Estimated delivery time update', required: false })
  @IsDateString()
  @IsOptional()
  estimatedDeliveryTime?: string;
}
