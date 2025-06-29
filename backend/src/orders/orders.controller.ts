import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderFiltersDto } from './dto/order-filters.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('orders')
@Controller('orders')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiOperation({ summary: 'Place a new order from cart' })
  @ApiResponse({
    status: 201,
    description: 'Order placed successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - cart empty or validation error' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async placeOrder(@Request() req: any, @Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.placeOrder(req.user.sub, createOrderDto);
  }

  @Get('my-orders')
  @ApiOperation({ summary: 'Get customer orders' })
  @ApiResponse({
    status: 200,
    description: 'Customer orders retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            orders: { type: 'array', items: { type: 'object' } },
            pagination: { type: 'object' },
          },
        },
      },
    },
  })
  async getMyOrders(@Request() req: any, @Query() filters: OrderFiltersDto) {
    return this.ordersService.getCustomerOrders(req.user.sub, filters);
  }

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get all orders (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'All orders retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            orders: { type: 'array', items: { type: 'object' } },
            pagination: { type: 'object' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async getAllOrders(@Query() filters: OrderFiltersDto) {
    return this.ordersService.getAllOrders(filters);
  }

  @Get('admin/stats')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Get order statistics (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Order statistics retrieved successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: {
          type: 'object',
          properties: {
            totalOrders: { type: 'number' },
            pendingOrders: { type: 'number' },
            completedOrders: { type: 'number' },
            cancelledOrders: { type: 'number' },
            todayOrders: { type: 'number' },
            revenueToday: { type: 'number' },
            revenueTotal: { type: 'number' },
          },
        },
      },
    },
  })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  async getOrderStats() {
    return this.ordersService.getOrderStats();
  }

  @Get('track/:orderNumber')
  @ApiOperation({ summary: 'Track order by order number' })
  @ApiResponse({
    status: 200,
    description: 'Order found and returned',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async trackOrder(@Param('orderNumber') orderNumber: string) {
    return this.ordersService.getOrderByNumber(orderNumber);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiResponse({
    status: 200,
    description: 'Order found and returned',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async getOrderById(@Param('id') id: string) {
    return this.ordersService.getOrderById(id);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Update order status (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Order status updated successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - invalid status transition' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async updateOrderStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateOrderStatus(id, updateStatusDto);
  }

  @Delete(':id/cancel')
  @ApiOperation({ summary: 'Cancel order' })
  @ApiResponse({
    status: 200,
    description: 'Order cancelled successfully',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - order cannot be cancelled' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @HttpCode(HttpStatus.OK)
  async cancelOrder(
    @Param('id') id: string,
    @Body() body?: { reason?: string },
  ) {
    return this.ordersService.cancelOrder(id, body?.reason);
  }

  @Patch('admin/:id/cancel')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ summary: 'Cancel order (admin)' })
  @ApiResponse({
    status: 200,
    description: 'Order cancelled successfully by admin',
    schema: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        data: { type: 'object' },
        message: { type: 'string' },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad request - order cannot be cancelled' })
  @ApiResponse({ status: 403, description: 'Forbidden - admin access required' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  async adminCancelOrder(
    @Param('id') id: string,
    @Body() body?: { reason?: string },
  ) {
    return this.ordersService.cancelOrder(id, body?.reason);
  }
}
