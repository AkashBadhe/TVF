import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadController, StaticFilesController } from './upload.controller';
import { UploadService } from './upload.service';
import { MenuItem, MenuItemSchema } from '../menu/schemas/menu-item.schema';
import { Category, CategorySchema } from '../menu/schemas/category.schema';
import { Restaurant, RestaurantSchema } from '../restaurant/schemas/restaurant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MenuItem.name, schema: MenuItemSchema },
      { name: Category.name, schema: CategorySchema },
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [UploadController, StaticFilesController],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
