import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MenuItem, MenuItemDocument } from './schemas/menu-item.schema';
import { Category, CategoryDocument } from './schemas/category.schema';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MenuQueryDto } from './dto/menu-query.dto';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItemDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  // Category methods
  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async getAllCategories(): Promise<Category[]> {
    return this.categoryModel
      .find({ isActive: true })
      .sort({ sortOrder: 1, name: 1 })
      .exec();
  }

  async getCategoriesWithItemCount(): Promise<any[]> {
    const categories = await this.categoryModel.aggregate([
      { $match: { isActive: true } },
      {
        $lookup: {
          from: 'menuitems',
          localField: '_id',
          foreignField: 'categoryId',
          as: 'items',
        },
      },
      {
        $addFields: {
          itemCount: { $size: '$items' },
        },
      },
      {
        $project: {
          items: 0,
        },
      },
      { $sort: { sortOrder: 1, name: 1 } },
    ]);

    return categories;
  }

  async getCategoryById(id: string): Promise<Category> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid category ID');
    }

    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid category ID');
    }

    const category = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async deleteCategory(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid category ID');
    }

    // Check if category has menu items
    const itemCount = await this.menuItemModel.countDocuments({ categoryId: id });
    if (itemCount > 0) {
      throw new BadRequestException('Cannot delete category with existing menu items');
    }

    const result = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Category not found');
    }
  }

  // Menu Item methods
  async createMenuItem(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    // Validate category exists
    await this.getCategoryById(createMenuItemDto.categoryId);

    const menuItem = new this.menuItemModel(createMenuItemDto);
    return menuItem.save();
  }

  async getAllMenuItems(query: MenuQueryDto): Promise<{
    items: MenuItem[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const {
      search,
      categoryId,
      isVegetarian,
      isVegan,
      isGlutenFree,
      isSpicy,
      minPrice,
      maxPrice,
      sortBy = 'name',
      sortOrder = 'asc',
      page = 1,
      limit = 20,
    } = query;

    // Build filter object
    const filter: any = { isAvailable: true };

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { ingredients: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    if (categoryId) {
      if (!Types.ObjectId.isValid(categoryId)) {
        throw new BadRequestException('Invalid category ID');
      }
      filter.categoryId = categoryId;
    }

    if (isVegetarian !== undefined) {
      filter.isVegetarian = isVegetarian;
    }

    if (isVegan !== undefined) {
      filter.isVegan = isVegan;
    }

    if (isGlutenFree !== undefined) {
      filter.isGlutenFree = isGlutenFree;
    }

    if (isSpicy !== undefined) {
      filter.isSpicy = isSpicy;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      filter.price = {};
      if (minPrice !== undefined) filter.price.$gte = minPrice;
      if (maxPrice !== undefined) filter.price.$lte = maxPrice;
    }

    // Build sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const [items, total] = await Promise.all([
      this.menuItemModel
        .find(filter)
        .populate('categoryId', 'name description')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.menuItemModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      items,
      total,
      page,
      totalPages,
    };
  }

  async getMenuItemById(id: string): Promise<MenuItem> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid menu item ID');
    }

    const menuItem = await this.menuItemModel
      .findById(id)
      .populate('categoryId', 'name description')
      .exec();

    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }
    return menuItem;
  }

  async updateMenuItem(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<MenuItem> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid menu item ID');
    }

    // If categoryId is being updated, validate it exists
    if (updateMenuItemDto.categoryId) {
      await this.getCategoryById(updateMenuItemDto.categoryId);
    }

    const menuItem = await this.menuItemModel
      .findByIdAndUpdate(id, updateMenuItemDto, { new: true })
      .populate('categoryId', 'name description')
      .exec();

    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }
    return menuItem;
  }

  async deleteMenuItem(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid menu item ID');
    }

    const result = await this.menuItemModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Menu item not found');
    }
  }

  async toggleMenuItemAvailability(id: string): Promise<MenuItem> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid menu item ID');
    }

    const menuItem = await this.menuItemModel.findById(id).exec();
    if (!menuItem) {
      throw new NotFoundException('Menu item not found');
    }

    menuItem.isAvailable = !menuItem.isAvailable;
    await menuItem.save();

    const updatedItem = await this.menuItemModel
      .findById(id)
      .populate('categoryId', 'name description')
      .exec();

    if (!updatedItem) {
      throw new NotFoundException('Menu item not found after update');
    }

    return updatedItem;
  }

  async searchMenuItems(searchTerm: string): Promise<MenuItem[]> {
    if (!searchTerm || searchTerm.trim().length < 2) {
      throw new BadRequestException('Search term must be at least 2 characters long');
    }

    return this.menuItemModel
      .find({
        isAvailable: true,
        $or: [
          { name: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } },
          { ingredients: { $in: [new RegExp(searchTerm, 'i')] } },
        ],
      })
      .populate('categoryId', 'name description')
      .sort({ rating: -1, name: 1 })
      .limit(50)
      .exec();
  }

  async getMenuItemsByCategory(categoryId: string): Promise<MenuItem[]> {
    if (!Types.ObjectId.isValid(categoryId)) {
      throw new BadRequestException('Invalid category ID');
    }

    // Validate category exists
    await this.getCategoryById(categoryId);

    return this.menuItemModel
      .find({ categoryId, isAvailable: true })
      .sort({ name: 1 })
      .exec();
  }

  async getFeaturedItems(limit: number = 10): Promise<MenuItem[]> {
    return this.menuItemModel
      .find({ isAvailable: true })
      .sort({ rating: -1, reviewCount: -1 })
      .limit(limit)
      .populate('categoryId', 'name description')
      .exec();
  }
}
