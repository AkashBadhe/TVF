import { IsOptional, IsString, IsBoolean, IsNumber, Min, Max } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class MenuQueryDto {
  @ApiPropertyOptional({ description: 'Search term for menu items' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ description: 'Filter by category ID' })
  @IsOptional()
  @IsString()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Filter vegetarian items only' })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isVegetarian?: boolean;

  @ApiPropertyOptional({ description: 'Filter vegan items only' })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isVegan?: boolean;

  @ApiPropertyOptional({ description: 'Filter gluten-free items only' })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isGlutenFree?: boolean;

  @ApiPropertyOptional({ description: 'Filter spicy items only' })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isSpicy?: boolean;

  @ApiPropertyOptional({ description: 'Minimum price filter' })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ description: 'Maximum price filter' })
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ description: 'Sort by field', enum: ['name', 'price', 'rating', 'preparationTime'] })
  @IsOptional()
  @IsString()
  sortBy?: 'name' | 'price' | 'rating' | 'preparationTime';

  @ApiPropertyOptional({ description: 'Sort order', enum: ['asc', 'desc'], default: 'asc' })
  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc';

  @ApiPropertyOptional({ description: 'Page number for pagination', default: 1 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ description: 'Items per page', default: 20 })
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(100)
  limit?: number;
}
