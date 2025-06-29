import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MenuItem, MenuItemDocument } from '../menu/schemas/menu-item.schema';
import { Category, CategoryDocument } from '../menu/schemas/category.schema';
import { Restaurant, RestaurantDocument } from '../restaurant/schemas/restaurant.schema';
import { FileUploadResponseDto, MultipleFileUploadResponseDto } from './dto';
import { UploadPath, UPLOAD_PATHS } from './config/multer.config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UploadService {
  constructor(
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItemDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
  ) {}

  createFileResponse(
    file: Express.Multer.File,
    uploadPath: UploadPath,
  ): Omit<FileUploadResponseDto, 'success' | 'message'> {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
    return {
      url: `${baseUrl}/uploads/${uploadPath}/${file.filename}`,
      originalName: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
    };
  }

  async uploadMenuItemImage(
    menuItemId: string,
    file: Express.Multer.File,
  ): Promise<FileUploadResponseDto> {
    // Check if menu item exists
    const menuItem = await this.menuItemModel.findById(menuItemId);
    if (!menuItem) {
      // Clean up uploaded file
      this.deleteFile(file.path);
      throw new NotFoundException('Menu item not found');
    }

    const fileResponse = this.createFileResponse(file, UPLOAD_PATHS.MENU);

    // Add image URL to images array (MenuItem only has images array, not single image)
    const existingImages = menuItem.images || [];
    await this.menuItemModel.findByIdAndUpdate(menuItemId, {
      images: [...existingImages, fileResponse.url],
    });

    return {
      success: true,
      message: 'Menu item image uploaded successfully',
      ...fileResponse,
    };
  }

  async uploadMultipleMenuItemImages(
    menuItemId: string,
    files: Express.Multer.File[],
  ): Promise<MultipleFileUploadResponseDto> {
    // Check if menu item exists
    const menuItem = await this.menuItemModel.findById(menuItemId);
    if (!menuItem) {
      // Clean up uploaded files
      files.forEach(file => this.deleteFile(file.path));
      throw new NotFoundException('Menu item not found');
    }

    const fileResponses = files.map(file => 
      this.createFileResponse(file, UPLOAD_PATHS.MENU)
    );

    // Update menu item with image URLs (add to existing images)
    const existingImages = menuItem.images || [];
    const newImageUrls = fileResponses.map(f => f.url);
    
    await this.menuItemModel.findByIdAndUpdate(menuItemId, {
      images: [...existingImages, ...newImageUrls],
    });

    return {
      success: true,
      files: fileResponses,
      message: `${files.length} images uploaded successfully`,
    };
  }

  async uploadCategoryImage(
    categoryId: string,
    file: Express.Multer.File,
  ): Promise<FileUploadResponseDto> {
    // Check if category exists
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      // Clean up uploaded file
      this.deleteFile(file.path);
      throw new NotFoundException('Category not found');
    }

    const fileResponse = this.createFileResponse(file, UPLOAD_PATHS.CATEGORIES);

    // Update category with image URL
    await this.categoryModel.findByIdAndUpdate(categoryId, {
      image: fileResponse.url,
    });

    return {
      success: true,
      message: 'Category image uploaded successfully',
      ...fileResponse,
    };
  }

  async uploadRestaurantLogo(
    file: Express.Multer.File,
  ): Promise<FileUploadResponseDto> {
    const fileResponse = this.createFileResponse(file, UPLOAD_PATHS.RESTAURANT);

    // Update restaurant with logo URL
    const restaurant = await this.restaurantModel.findOne();
    if (!restaurant) {
      // Clean up uploaded file
      this.deleteFile(file.path);
      throw new NotFoundException('Restaurant information not found');
    }

    await this.restaurantModel.findByIdAndUpdate(restaurant._id, {
      logo: fileResponse.url,
    });

    return {
      success: true,
      message: 'Restaurant logo uploaded successfully',
      ...fileResponse,
    };
  }

  async uploadRestaurantImages(
    files: Express.Multer.File[],
  ): Promise<MultipleFileUploadResponseDto> {
    const restaurant = await this.restaurantModel.findOne();
    if (!restaurant) {
      // Clean up uploaded files
      files.forEach(file => this.deleteFile(file.path));
      throw new NotFoundException('Restaurant information not found');
    }

    const fileResponses = files.map(file => 
      this.createFileResponse(file, UPLOAD_PATHS.RESTAURANT)
    );

    // Update restaurant with image URLs (add to existing images)
    const existingImages = restaurant.images || [];
    const newImageUrls = fileResponses.map(f => f.url);
    
    await this.restaurantModel.findByIdAndUpdate(restaurant._id, {
      images: [...existingImages, ...newImageUrls],
    });

    return {
      success: true,
      files: fileResponses,
      message: `${files.length} restaurant images uploaded successfully`,
    };
  }

  async deleteMenuItemImage(menuItemId: string, imageUrl: string): Promise<void> {
    const menuItem = await this.menuItemModel.findById(menuItemId);
    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }

    // Remove from images array (MenuItem only has images array)
    if (menuItem.images && menuItem.images.includes(imageUrl)) {
      await this.menuItemModel.findByIdAndUpdate(menuItemId, {
        images: menuItem.images.filter(img => img !== imageUrl),
      });
      
      // Delete physical file
      this.deleteFileByUrl(imageUrl);
    }
  }

  async deleteCategoryImage(categoryId: string): Promise<void> {
    const category = await this.categoryModel.findById(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (category.image) {
      // Delete physical file
      this.deleteFileByUrl(category.image);
      
      // Remove from database
      await this.categoryModel.findByIdAndUpdate(categoryId, {
        image: null,
      });
    }
  }

  async deleteRestaurantLogo(): Promise<void> {
    const restaurant = await this.restaurantModel.findOne();
    if (!restaurant) {
      throw new NotFoundException('Restaurant information not found');
    }

    if (restaurant.logo) {
      // Delete physical file
      this.deleteFileByUrl(restaurant.logo);
      
      // Remove from database
      await this.restaurantModel.findByIdAndUpdate(restaurant._id, {
        logo: null,
      });
    }
  }

  async deleteRestaurantImage(imageUrl: string): Promise<void> {
    const restaurant = await this.restaurantModel.findOne();
    if (!restaurant) {
      throw new NotFoundException('Restaurant information not found');
    }

    if (restaurant.images && restaurant.images.includes(imageUrl)) {
      // Remove from database
      await this.restaurantModel.findByIdAndUpdate(restaurant._id, {
        images: restaurant.images.filter(img => img !== imageUrl),
      });
      
      // Delete physical file
      this.deleteFileByUrl(imageUrl);
    }
  }

  private deleteFile(filePath: string): void {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  private deleteFileByUrl(imageUrl: string): void {
    try {
      // Extract filename from URL
      const urlParts = imageUrl.split('/');
      const filename = urlParts[urlParts.length - 1];
      const uploadType = urlParts[urlParts.length - 2];
      
      const filePath = path.join(
        process.cwd(),
        'uploads',
        uploadType,
        filename
      );
      
      this.deleteFile(filePath);
    } catch (error) {
      console.error('Error deleting file by URL:', error);
    }
  }

  async getFileInfo(uploadPath: UploadPath, filename: string) {
    const filePath = path.join(process.cwd(), 'uploads', uploadPath, filename);
    
    try {
      const stats = fs.statSync(filePath);
      const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
      
      return {
        success: true,
        data: {
          filename,
          size: stats.size,
          url: `${baseUrl}/uploads/${uploadPath}/${filename}`,
          lastModified: stats.mtime,
        },
      };
    } catch (error) {
      throw new NotFoundException('File not found');
    }
  }
}
