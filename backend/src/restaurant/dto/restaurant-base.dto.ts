import { IsString, IsEmail, IsOptional, ValidateNested, IsNumber, Min, Max, IsBoolean, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AddressDto {
  @ApiProperty({ description: 'Street address' })
  @IsString()
  street: string;

  @ApiProperty({ description: 'City' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'ZIP code' })
  @IsString()
  zipCode: string;

  @ApiProperty({ description: 'Country', default: 'USA' })
  @IsString()
  @IsOptional()
  country?: string = 'USA';
}

export class BusinessHoursDto {
  @ApiProperty({ description: 'Opening time (HH:MM format)' })
  @IsString()
  open: string;

  @ApiProperty({ description: 'Closing time (HH:MM format)' })
  @IsString()
  close: string;

  @ApiProperty({ description: 'Whether the restaurant is open this day', default: true })
  @IsBoolean()
  @IsOptional()
  isOpen?: boolean = true;
}

export class WeeklyHoursDto {
  @ApiProperty({ type: BusinessHoursDto })
  @ValidateNested()
  @Type(() => BusinessHoursDto)
  monday: BusinessHoursDto;

  @ApiProperty({ type: BusinessHoursDto })
  @ValidateNested()
  @Type(() => BusinessHoursDto)
  tuesday: BusinessHoursDto;

  @ApiProperty({ type: BusinessHoursDto })
  @ValidateNested()
  @Type(() => BusinessHoursDto)
  wednesday: BusinessHoursDto;

  @ApiProperty({ type: BusinessHoursDto })
  @ValidateNested()
  @Type(() => BusinessHoursDto)
  thursday: BusinessHoursDto;

  @ApiProperty({ type: BusinessHoursDto })
  @ValidateNested()
  @Type(() => BusinessHoursDto)
  friday: BusinessHoursDto;

  @ApiProperty({ type: BusinessHoursDto })
  @ValidateNested()
  @Type(() => BusinessHoursDto)
  saturday: BusinessHoursDto;

  @ApiProperty({ type: BusinessHoursDto })
  @ValidateNested()
  @Type(() => BusinessHoursDto)
  sunday: BusinessHoursDto;
}
