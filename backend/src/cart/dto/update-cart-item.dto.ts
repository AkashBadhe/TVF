import { IsNumber, IsOptional, IsString, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateCartItemDto {
  @ApiProperty({ description: 'New quantity for the item', minimum: 1, maximum: 50 })
  @IsNumber()
  @Min(1)
  @Max(50)
  @Transform(({ value }) => parseInt(value))
  quantity: number;

  @ApiPropertyOptional({ description: 'Updated special instructions for the item' })
  @IsOptional()
  @IsString()
  specialInstructions?: string;
}
