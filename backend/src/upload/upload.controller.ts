import {
  Controller,
  Post,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiParam, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { UploadService } from './upload.service';
import { FileUploadResponseDto, MultipleFileUploadResponseDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { createMulterOptions, UPLOAD_PATHS } from './config/multer.config';
import * as path from 'path';
import * as fs from 'fs';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('menu-item/:id/image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image', createMulterOptions(UPLOAD_PATHS.MENU)))
  @ApiOperation({ summary: 'Upload single image for menu item (admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  @ApiResponse({
    status: 201,
    description: 'Image uploaded successfully',
    type: FileUploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid file or menu item not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async uploadMenuItemImage(
    @Param('id') menuItemId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.uploadService.uploadMenuItemImage(menuItemId, file);
  }

  @Post('menu-item/:id/images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('images', 5, createMulterOptions(UPLOAD_PATHS.MENU)))
  @ApiOperation({ summary: 'Upload multiple images for menu item (admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  @ApiResponse({
    status: 201,
    description: 'Images uploaded successfully',
    type: MultipleFileUploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid files or menu item not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async uploadMenuItemImages(
    @Param('id') menuItemId: string,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    return this.uploadService.uploadMultipleMenuItemImages(menuItemId, files);
  }

  @Post('category/:id/image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('image', createMulterOptions(UPLOAD_PATHS.CATEGORIES)))
  @ApiOperation({ summary: 'Upload image for category (admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({
    status: 201,
    description: 'Category image uploaded successfully',
    type: FileUploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid file or category not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async uploadCategoryImage(
    @Param('id') categoryId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.uploadService.uploadCategoryImage(categoryId, file);
  }

  @Post('restaurant/logo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('logo', createMulterOptions(UPLOAD_PATHS.RESTAURANT)))
  @ApiOperation({ summary: 'Upload restaurant logo (admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Restaurant logo uploaded successfully',
    type: FileUploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid file' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async uploadRestaurantLogo(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.uploadService.uploadRestaurantLogo(file);
  }

  @Post('restaurant/images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @UseInterceptors(FilesInterceptor('images', 10, createMulterOptions(UPLOAD_PATHS.RESTAURANT)))
  @ApiOperation({ summary: 'Upload restaurant images (admin only)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    description: 'Restaurant images uploaded successfully',
    type: MultipleFileUploadResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid files' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async uploadRestaurantImages(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    return this.uploadService.uploadRestaurantImages(files);
  }

  @Delete('menu-item/:id/image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete menu item image (admin only)' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  @ApiQuery({ name: 'imageUrl', description: 'Image URL to delete' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 404, description: 'Menu item or image not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async deleteMenuItemImage(
    @Param('id') menuItemId: string,
    @Query('imageUrl') imageUrl: string,
  ) {
    if (!imageUrl) {
      throw new BadRequestException('Image URL is required');
    }
    await this.uploadService.deleteMenuItemImage(menuItemId, imageUrl);
    return {
      success: true,
      message: 'Image deleted successfully',
    };
  }

  @Delete('category/:id/image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete category image (admin only)' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async deleteCategoryImage(@Param('id') categoryId: string) {
    await this.uploadService.deleteCategoryImage(categoryId);
    return {
      success: true,
      message: 'Category image deleted successfully',
    };
  }

  @Delete('restaurant/logo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete restaurant logo (admin only)' })
  @ApiResponse({ status: 200, description: 'Logo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Restaurant not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async deleteRestaurantLogo() {
    await this.uploadService.deleteRestaurantLogo();
    return {
      success: true,
      message: 'Restaurant logo deleted successfully',
    };
  }

  @Delete('restaurant/image')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete restaurant image (admin only)' })
  @ApiQuery({ name: 'imageUrl', description: 'Image URL to delete' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 404, description: 'Restaurant or image not found' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async deleteRestaurantImage(@Query('imageUrl') imageUrl: string) {
    if (!imageUrl) {
      throw new BadRequestException('Image URL is required');
    }
    await this.uploadService.deleteRestaurantImage(imageUrl);
    return {
      success: true,
      message: 'Restaurant image deleted successfully',
    };
  }

  @Get('info/:type/:filename')
  @ApiOperation({ summary: 'Get file information' })
  @ApiParam({ name: 'type', description: 'Upload type (menu, restaurant, categories)' })
  @ApiParam({ name: 'filename', description: 'File name' })
  @ApiResponse({ status: 200, description: 'File information retrieved successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  async getFileInfo(
    @Param('type') type: string,
    @Param('filename') filename: string,
  ) {
    const validTypes = Object.values(UPLOAD_PATHS);
    if (!validTypes.includes(type as any)) {
      throw new BadRequestException('Invalid upload type');
    }
    return this.uploadService.getFileInfo(type as any, filename);
  }
}

// Separate controller for serving static files
@Controller('uploads')
export class StaticFilesController {
  @Get(':type/:filename')
  @ApiOperation({ summary: 'Serve uploaded files' })
  @ApiParam({ name: 'type', description: 'Upload type (menu, restaurant, categories)' })
  @ApiParam({ name: 'filename', description: 'File name' })
  @ApiResponse({ status: 200, description: 'File served successfully' })
  @ApiResponse({ status: 404, description: 'File not found' })
  serveFile(
    @Param('type') type: string,
    @Param('filename') filename: string,
    @Res() res: Response,
  ) {
    const validTypes = Object.values(UPLOAD_PATHS);
    if (!validTypes.includes(type as any)) {
      return res.status(400).json({ message: 'Invalid upload type' });
    }

    const filePath = path.join(process.cwd(), 'uploads', type, filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    return res.sendFile(filePath);
  }
}
