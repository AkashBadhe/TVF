import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize } from 'class-validator';
import { CreateMenuItemDto } from './create-menu-item.dto';

export class CreateMultipleMenuItemsDto {
  @ApiProperty({
    description: 'Array of menu items to create',
    type: [CreateMenuItemDto],
    minItems: 1,
    maxItems: 50,
  })
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one menu item is required' })
  @ArrayMaxSize(50, { message: 'Maximum 50 menu items can be created at once' })
  @ValidateNested({ each: true })
  @Type(() => CreateMenuItemDto)
  items: CreateMenuItemDto[];
}
