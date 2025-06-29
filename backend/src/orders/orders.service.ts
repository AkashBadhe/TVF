import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument, OrderStatus, OrderType } from './schemas/order.schema';
import { Cart, CartDocument } from '../cart/schemas/cart.schema';
import { MenuItem, MenuItemDocument } from '../menu/schemas/menu-item.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { OrderFiltersDto } from './dto/order-filters.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    @InjectModel(MenuItem.name) private menuItemModel: Model<MenuItemDocument>,
  ) {}

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD${timestamp}${random}`;
  }

  async placeOrder(customerId: string, createOrderDto: CreateOrderDto) {
    // Get customer's cart
    const cart = await this.cartModel.findOne({ 
      customerId, 
      isActive: true 
    }).populate('items.menuItemId');

    if (!cart || cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Validate delivery address for delivery orders
    if (createOrderDto.orderType === OrderType.DELIVERY && !createOrderDto.deliveryAddress) {
      throw new BadRequestException('Delivery address is required for delivery orders');
    }

    // Prepare order items with current menu item data
    const orderItems: any[] = [];
    let calculatedSubtotal = 0;

    for (const cartItem of cart.items) {
      const menuItem = cartItem.menuItemId as any;
      
      if (!menuItem.isAvailable) {
        throw new BadRequestException(`Menu item "${menuItem.name}" is no longer available`);
      }

      const itemTotal = menuItem.price * cartItem.quantity;
      calculatedSubtotal += itemTotal;

      orderItems.push({
        menuItemId: menuItem._id,
        name: menuItem.name,
        price: menuItem.price,
        quantity: cartItem.quantity,
        specialInstructions: cartItem.specialInstructions,
      });
    }

    // Calculate totals
    const taxRate = 0.1; // 10% tax
    const tax = calculatedSubtotal * taxRate;
    const deliveryFee = createOrderDto.orderType === OrderType.DELIVERY ? 5.99 : 0;
    const total = calculatedSubtotal + tax + deliveryFee;

    // Create order
    const orderData = {
      orderNumber: this.generateOrderNumber(),
      customerInfo: createOrderDto.customerInfo,
      items: orderItems,
      subtotal: calculatedSubtotal,
      tax,
      deliveryFee,
      total,
      status: OrderStatus.PENDING,
      orderType: createOrderDto.orderType,
      paymentMethod: createOrderDto.paymentMethod,
      deliveryAddress: createOrderDto.deliveryAddress,
      specialInstructions: createOrderDto.specialInstructions,
      estimatedDeliveryTime: createOrderDto.estimatedDeliveryTime ? 
        new Date(createOrderDto.estimatedDeliveryTime) : 
        this.calculateEstimatedDeliveryTime(createOrderDto.orderType),
    };

    const order = new this.orderModel(orderData);
    await order.save();

    // Clear customer's cart
    await this.cartModel.findOneAndUpdate(
      { customerId },
      { 
        items: [], 
        subtotal: 0, 
        tax: 0, 
        deliveryFee: 0, 
        total: 0, 
        isActive: false 
      }
    );

    return {
      success: true,
      data: order,
      message: 'Order placed successfully',
    };
  }

  private calculateEstimatedDeliveryTime(orderType: OrderType): Date {
    const now = new Date();
    const estimatedMinutes = orderType === OrderType.DELIVERY ? 45 : 25; // 45 min for delivery, 25 min for pickup
    return new Date(now.getTime() + estimatedMinutes * 60000);
  }

  async getCustomerOrders(customerId: string, filters: OrderFiltersDto) {
    const query: any = { 'customerInfo.email': { $exists: true } };

    // We'll match by customer email since we don't store customerId in orders
    // In a real app, you might want to add customerId to order schema
    const customer = await this.getCustomerByIdFromAuth(customerId);
    if (customer) {
      query['customerInfo.email'] = customer.email;
    }

    // Apply filters
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.orderType) {
      query.orderType = filters.orderType;
    }
    if (filters.paymentMethod) {
      query.paymentMethod = filters.paymentMethod;
    }
    if (filters.orderNumber) {
      query.orderNumber = { $regex: filters.orderNumber, $options: 'i' };
    }
    if (filters.dateFrom || filters.dateTo) {
      query.createdAt = {};
      if (filters.dateFrom) {
        query.createdAt.$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        query.createdAt.$lte = new Date(filters.dateTo);
      }
    }

    // Pagination and sorting
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const sortBy = filters.sortBy || 'createdAt';
    const skip = (page - 1) * limit;
    const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;
    const sortObj: any = {};
    sortObj[sortBy] = sortOrder;

    const [orders, total] = await Promise.all([
      this.orderModel
        .find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .populate('items.menuItemId'),
      this.orderModel.countDocuments(query),
    ]);

    return {
      success: true,
      data: {
        orders,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  }

  async getAllOrders(filters: OrderFiltersDto) {
    const query: any = {};

    // Apply filters
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.orderType) {
      query.orderType = filters.orderType;
    }
    if (filters.paymentMethod) {
      query.paymentMethod = filters.paymentMethod;
    }
    if (filters.customerEmail) {
      query['customerInfo.email'] = { $regex: filters.customerEmail, $options: 'i' };
    }
    if (filters.orderNumber) {
      query.orderNumber = { $regex: filters.orderNumber, $options: 'i' };
    }
    if (filters.dateFrom || filters.dateTo) {
      query.createdAt = {};
      if (filters.dateFrom) {
        query.createdAt.$gte = new Date(filters.dateFrom);
      }
      if (filters.dateTo) {
        query.createdAt.$lte = new Date(filters.dateTo);
      }
    }

    // Pagination and sorting
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const sortBy = filters.sortBy || 'createdAt';
    const skip = (page - 1) * limit;
    const sortOrder = filters.sortOrder === 'asc' ? 1 : -1;
    const sortObj: any = {};
    sortObj[sortBy] = sortOrder;

    const [orders, total] = await Promise.all([
      this.orderModel
        .find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .populate('items.menuItemId'),
      this.orderModel.countDocuments(query),
    ]);

    return {
      success: true,
      data: {
        orders,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    };
  }

  async getOrderById(orderId: string) {
    const order = await this.orderModel
      .findById(orderId)
      .populate('items.menuItemId');

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      success: true,
      data: order,
    };
  }

  async getOrderByNumber(orderNumber: string) {
    const order = await this.orderModel
      .findOne({ orderNumber })
      .populate('items.menuItemId');

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return {
      success: true,
      data: order,
    };
  }

  async updateOrderStatus(orderId: string, updateStatusDto: UpdateOrderStatusDto) {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Validate status transitions
    this.validateStatusTransition(order.status, updateStatusDto.status);

    const updateData: any = {
      status: updateStatusDto.status,
    };

    if (updateStatusDto.estimatedDeliveryTime) {
      updateData.estimatedDeliveryTime = new Date(updateStatusDto.estimatedDeliveryTime);
    }

    if (updateStatusDto.status === OrderStatus.DELIVERED && updateStatusDto.actualDeliveryTime) {
      updateData.actualDeliveryTime = new Date(updateStatusDto.actualDeliveryTime);
    } else if (updateStatusDto.status === OrderStatus.DELIVERED && !updateStatusDto.actualDeliveryTime) {
      updateData.actualDeliveryTime = new Date();
    }

    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(orderId, updateData, { new: true })
      .populate('items.menuItemId');

    return {
      success: true,
      data: updatedOrder,
      message: `Order status updated to ${updateStatusDto.status}`,
    };
  }

  private validateStatusTransition(currentStatus: OrderStatus, newStatus: OrderStatus) {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
      [OrderStatus.PREPARING]: [OrderStatus.READY, OrderStatus.CANCELLED],
      [OrderStatus.READY]: [OrderStatus.OUT_FOR_DELIVERY, OrderStatus.DELIVERED],
      [OrderStatus.OUT_FOR_DELIVERY]: [OrderStatus.DELIVERED],
      [OrderStatus.DELIVERED]: [], // Final state
      [OrderStatus.CANCELLED]: [], // Final state
    };

    if (!validTransitions[currentStatus].includes(newStatus)) {
      throw new BadRequestException(
        `Invalid status transition from ${currentStatus} to ${newStatus}`
      );
    }
  }

  async getOrderStats() {
    const [
      totalOrders,
      pendingOrders,
      completedOrders,
      cancelledOrders,
      todayOrders,
      revenueToday,
      revenueTotal,
    ] = await Promise.all([
      this.orderModel.countDocuments(),
      this.orderModel.countDocuments({ status: OrderStatus.PENDING }),
      this.orderModel.countDocuments({ status: OrderStatus.DELIVERED }),
      this.orderModel.countDocuments({ status: OrderStatus.CANCELLED }),
      this.orderModel.countDocuments({
        createdAt: {
          $gte: new Date(new Date().setHours(0, 0, 0, 0)),
          $lt: new Date(new Date().setHours(23, 59, 59, 999)),
        },
      }),
      this.orderModel.aggregate([
        {
          $match: {
            status: OrderStatus.DELIVERED,
            createdAt: {
              $gte: new Date(new Date().setHours(0, 0, 0, 0)),
              $lt: new Date(new Date().setHours(23, 59, 59, 999)),
            },
          },
        },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
      this.orderModel.aggregate([
        { $match: { status: OrderStatus.DELIVERED } },
        { $group: { _id: null, total: { $sum: '$total' } } },
      ]),
    ]);

    return {
      success: true,
      data: {
        totalOrders,
        pendingOrders,
        completedOrders,
        cancelledOrders,
        todayOrders,
        revenueToday: revenueToday[0]?.total || 0,
        revenueTotal: revenueTotal[0]?.total || 0,
      },
    };
  }

  // Helper method to get customer info (this would typically come from your auth context)
  private async getCustomerByIdFromAuth(customerId: string): Promise<{ email: string } | null> {
    // This is a placeholder - in a real app, you'd get this from your auth service
    // For now, we'll return null and rely on email matching in queries
    return null;
  }

  async cancelOrder(orderId: string, reason?: string) {
    const order = await this.orderModel.findById(orderId);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (![OrderStatus.PENDING, OrderStatus.CONFIRMED].includes(order.status)) {
      throw new BadRequestException('Order cannot be cancelled at this stage');
    }

    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(
        orderId,
        { 
          status: OrderStatus.CANCELLED,
          specialInstructions: reason ? 
            `${order.specialInstructions || ''}\nCancellation reason: ${reason}`.trim() : 
            order.specialInstructions
        },
        { new: true }
      )
      .populate('items.menuItemId');

    return {
      success: true,
      data: updatedOrder,
      message: 'Order cancelled successfully',
    };
  }
}
