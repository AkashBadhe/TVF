import { IsMongoId, IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class AddToCartDto {
  @ApiProperty({ description: 'Menu item ID to add to cart' })
  @IsMongoId()
  menuItemId: string;

  @ApiProperty({ description: 'Quantity of the item', minimum: 1, maximum: 50, default: 1 })
  @IsNumber()
  @Min(1)
  @Max(50)
  @Transform(({ value }) => parseInt(value))
  quantity: number;

  @ApiPropertyOptional({ description: 'Special instructions for the item' })
  @IsOptional()
  @IsString()
  specialInstructions?: string;
}
