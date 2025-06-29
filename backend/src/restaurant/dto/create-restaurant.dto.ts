import { IsString, IsEmail, IsOptional, ValidateNested, IsNumber, Min, Max, IsBoolean, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { AddressDto, WeeklyHoursDto } from './restaurant-base.dto';

export class CreateRestaurantDto {
  @ApiProperty({ description: 'Restaurant name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Restaurant description', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: AddressDto, description: 'Restaurant address' })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @ApiProperty({ description: 'Phone number' })
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: WeeklyHoursDto, description: 'Business hours', required: false })
  @ValidateNested()
  @Type(() => WeeklyHoursDto)
  @IsOptional()
  hours?: WeeklyHoursDto;

  @ApiProperty({ description: 'Delivery fee', minimum: 0, default: 3.99 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  deliveryFee?: number = 3.99;

  @ApiProperty({ description: 'Minimum order amount', minimum: 0, default: 15.0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  minimumOrder?: number = 15.0;

  @ApiProperty({ description: 'Tax rate (decimal)', minimum: 0, maximum: 1, default: 0.1 })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  taxRate?: number = 0.1;

  @ApiProperty({ description: 'Whether restaurant is currently open', default: true })
  @IsBoolean()
  @IsOptional()
  isOpen?: boolean = true;

  @ApiProperty({ description: 'Logo URL', required: false })
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiProperty({ description: 'Restaurant images', type: [String], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  images?: string[];

  @ApiProperty({ description: 'Cuisine types', type: [String], required: false })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  cuisineTypes?: string[];
}
