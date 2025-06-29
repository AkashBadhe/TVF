import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { MenuService } from './menu.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MenuQueryDto } from './dto/menu-query.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Category endpoints
  @Get('categories')
  @ApiOperation({ summary: 'Get all categories with item counts' })
  @ApiResponse({
    status: 200,
    description: 'Returns all active categories with item counts',
  })
  async getCategories() {
    const categories = await this.menuService.getCategoriesWithItemCount();
    return {
      success: true,
      data: categories,
    };
  }

  @Post('categories')
  @ApiOperation({ summary: 'Create a new category (Admin only)' })
  @ApiResponse({ status: 201, description: 'Category created successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const category = await this.menuService.createCategory(createCategoryDto);
    return {
      success: true,
      data: category,
    };
  }

  @Get('categories/:id')
  @ApiOperation({ summary: 'Get category by ID' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Returns category details' })
  @ApiResponse({ status: 404, description: 'Category not found' })
  async getCategoryById(@Param('id') id: string) {
    const category = await this.menuService.getCategoryById(id);
    return {
      success: true,
      data: category,
    };
  }

  @Patch('categories/:id')
  @ApiOperation({ summary: 'Update category (Admin only)' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Category updated successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.menuService.updateCategory(id, updateCategoryDto);
    return {
      success: true,
      data: category,
    };
  }

  @Delete('categories/:id')
  @ApiOperation({ summary: 'Delete category (Admin only)' })
  @ApiParam({ name: 'id', description: 'Category ID' })
  @ApiResponse({ status: 204, description: 'Category deleted successfully' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteCategory(@Param('id') id: string) {
    await this.menuService.deleteCategory(id);
  }

  // Menu item endpoints
  @Get()
  @ApiOperation({ summary: 'Get all menu items with filters and pagination' })
  @ApiQuery({ name: 'search', required: false, description: 'Search term' })
  @ApiQuery({ name: 'categoryId', required: false, description: 'Filter by category' })
  @ApiQuery({ name: 'isVegetarian', required: false, type: Boolean })
  @ApiQuery({ name: 'isVegan', required: false, type: Boolean })
  @ApiQuery({ name: 'isGlutenFree', required: false, type: Boolean })
  @ApiQuery({ name: 'isSpicy', required: false, type: Boolean })
  @ApiQuery({ name: 'minPrice', required: false, type: Number })
  @ApiQuery({ name: 'maxPrice', required: false, type: Number })
  @ApiQuery({ name: 'sortBy', required: false, enum: ['name', 'price', 'rating', 'preparationTime'] })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated menu items with filters applied',
  })
  async getMenuItems(@Query() query: MenuQueryDto) {
    const result = await this.menuService.getAllMenuItems(query);
    return {
      success: true,
      data: result,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new menu item (Admin only)' })
  @ApiResponse({ status: 201, description: 'Menu item created successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async createMenuItem(@Body() createMenuItemDto: CreateMenuItemDto) {
    const menuItem = await this.menuService.createMenuItem(createMenuItemDto);
    return {
      success: true,
      data: menuItem,
    };
  }

  @Get('search')
  @ApiOperation({ summary: 'Search menu items' })
  @ApiQuery({ name: 'q', description: 'Search query' })
  @ApiResponse({ status: 200, description: 'Returns search results' })
  async searchMenuItems(@Query('q') searchTerm: string) {
    const items = await this.menuService.searchMenuItems(searchTerm);
    return {
      success: true,
      data: items,
    };
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured menu items' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of items to return' })
  @ApiResponse({ status: 200, description: 'Returns featured items' })
  async getFeaturedItems(@Query('limit') limit?: number) {
    const items = await this.menuService.getFeaturedItems(limit);
    return {
      success: true,
      data: items,
    };
  }

  @Get('category/:categoryId')
  @ApiOperation({ summary: 'Get menu items by category' })
  @ApiParam({ name: 'categoryId', description: 'Category ID' })
  @ApiResponse({ status: 200, description: 'Returns menu items in category' })
  async getMenuItemsByCategory(@Param('categoryId') categoryId: string) {
    const items = await this.menuService.getMenuItemsByCategory(categoryId);
    return {
      success: true,
      data: items,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get menu item by ID' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  @ApiResponse({ status: 200, description: 'Returns menu item details' })
  @ApiResponse({ status: 404, description: 'Menu item not found' })
  async getMenuItemById(@Param('id') id: string) {
    const menuItem = await this.menuService.getMenuItemById(id);
    return {
      success: true,
      data: menuItem,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update menu item (Admin only)' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  @ApiResponse({ status: 200, description: 'Menu item updated successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateMenuItem(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ) {
    const menuItem = await this.menuService.updateMenuItem(id, updateMenuItemDto);
    return {
      success: true,
      data: menuItem,
    };
  }

  @Patch(':id/toggle-availability')
  @ApiOperation({ summary: 'Toggle menu item availability (Admin only)' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  @ApiResponse({ status: 200, description: 'Availability toggled successfully' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  async toggleAvailability(@Param('id') id: string) {
    const menuItem = await this.menuService.toggleMenuItemAvailability(id);
    return {
      success: true,
      data: menuItem,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete menu item (Admin only)' })
  @ApiParam({ name: 'id', description: 'Menu item ID' })
  @ApiResponse({ status: 204, description: 'Menu item deleted successfully' })
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteMenuItem(@Param('id') id: string) {
    await this.menuService.deleteMenuItem(id);
  }
}
