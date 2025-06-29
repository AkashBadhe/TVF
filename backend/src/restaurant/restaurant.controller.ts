import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantStatusDto } from './dto/restaurant-status.dto';
import { WeeklyHoursDto } from './dto/restaurant-base.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @ApiOperation({ summary: 'Get restaurant information (public)' })
  @ApiResponse({
    status: 200,
    description: 'Restaurant information retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            address: { type: 'object' },
            phone: { type: 'string' },
            email: { type: 'string' },
            hours: { type: 'object' },
            isOpen: { type: 'boolean' },
            currentStatus: { type: 'object' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Restaurant information not found' })
  async getPublicInfo() {
    return this.restaurantService.getPublicInfo();
  }

  @Get('contact')
  @ApiOperation({ summary: 'Get restaurant contact information' })
  @ApiResponse({
    status: 200,
    description: 'Contact information retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            phone: { type: 'string' },
            email: { type: 'string' },
            address: { type: 'object' },
          },
        },
      },
    },
  })
  async getContactInfo() {
    return this.restaurantService.getContactInfo();
  }

  @Get('delivery-info')
  @ApiOperation({ summary: 'Get delivery information' })
  @ApiResponse({
    status: 200,
    description: 'Delivery information retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            deliveryFee: { type: 'number' },
            minimumOrder: { type: 'number' },
            estimatedDeliveryTime: { type: 'string' },
            deliveryRadius: { type: 'string' },
            address: { type: 'object' },
          },
        },
      },
    },
  })
  async getDeliveryInfo() {
    return this.restaurantService.getDeliveryInfo();
  }

  @Get('admin/full')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get complete restaurant information (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Complete restaurant information retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  @ApiResponse({ status: 404, description: 'Restaurant information not found' })
  async getFullInfo() {
    return this.restaurantService.findOne();
  }

  @Get('admin/settings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get restaurant settings (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Restaurant settings retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            deliveryFee: { type: 'number' },
            minimumOrder: { type: 'number' },
            taxRate: { type: 'number' },
            isOpen: { type: 'boolean' },
            hours: { type: 'object' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async getSettings() {
    return this.restaurantService.getSettings();
  }

  @Post('admin/initialize')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Initialize restaurant information with defaults (admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Restaurant information initialized successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  @HttpCode(HttpStatus.CREATED)
  async initialize() {
    return this.restaurantService.initializeRestaurant();
  }

  @Post('admin/create')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create restaurant information (admin only)' })
  @ApiResponse({
    status: 201,
    description: 'Restaurant information created successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  @ApiResponse({ status: 409, description: 'Conflict - restaurant information already exists' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @Put('admin/update')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update restaurant information (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Restaurant information updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  @ApiResponse({ status: 404, description: 'Restaurant information not found' })
  async update(@Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantService.update(updateRestaurantDto);
  }

  @Patch('admin/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update restaurant open/closed status (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Restaurant status updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  @ApiResponse({ status: 404, description: 'Restaurant information not found' })
  async updateStatus(@Body() statusDto: RestaurantStatusDto) {
    return this.restaurantService.updateStatus(statusDto);
  }

  @Patch('admin/hours')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update restaurant business hours (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Business hours updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  @ApiResponse({ status: 404, description: 'Restaurant information not found' })
  async updateBusinessHours(@Body() hours: WeeklyHoursDto) {
    return this.restaurantService.updateBusinessHours(hours);
  }

  @Patch('admin/delivery-settings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update delivery settings (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Delivery settings updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  @ApiResponse({ status: 404, description: 'Restaurant information not found' })
  async updateDeliverySettings(
    @Body() body: { deliveryFee: number; minimumOrder: number },
  ) {
    return this.restaurantService.updateDeliverySettings(
      body.deliveryFee,
      body.minimumOrder,
    );
  }
}
