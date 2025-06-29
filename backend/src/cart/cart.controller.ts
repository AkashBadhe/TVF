import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CustomerGuard } from '../auth/guards/customer.guard';
import { AdminGuard } from '../auth/guards/admin.guard';

@ApiTags('Cart')
@Controller('cart')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Get current customer cart' })
  @ApiResponse({
    status: 200,
    description: 'Returns customer cart with items',
    schema: {
      example: {
        success: true,
        data: {
          id: 'cart123',
          customerId: 'customer123',
          items: [
            {
              menuItemId: {
                id: 'item123',
                name: 'Margherita Pizza',
                price: 12.99,
                images: ['pizza.jpg'],
              },
              quantity: 2,
              priceAtTime: 12.99,
              specialInstructions: 'Extra cheese',
            },
          ],
          subtotal: 25.98,
          tax: 2.60,
          deliveryFee: 3.99,
          total: 32.57,
          itemCount: 2,
        },
      },
    },
  })
  async getCart(@Request() req) {
    const cart = await this.cartService.getCart(req.user.id);
    return {
      success: true,
      data: cart,
    };
  }

  @Post('add')
  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Add item to cart' })
  @ApiResponse({
    status: 200,
    description: 'Item added to cart successfully',
  })
  @ApiResponse({ status: 400, description: 'Menu item not available or invalid quantity' })
  async addToCart(@Request() req, @Body() addToCartDto: AddToCartDto) {
    const cart = await this.cartService.addToCart(req.user.id, addToCartDto);
    return {
      success: true,
      data: cart,
      message: 'Item added to cart successfully',
    };
  }

  @Patch('items/:itemIndex')
  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Update cart item quantity and instructions' })
  @ApiParam({ name: 'itemIndex', description: 'Index of the item in cart (0-based)' })
  @ApiResponse({
    status: 200,
    description: 'Cart item updated successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid item index or quantity' })
  async updateCartItem(
    @Request() req,
    @Param('itemIndex') itemIndex: string,
    @Body() updateCartItemDto: UpdateCartItemDto,
  ) {
    const cart = await this.cartService.updateCartItem(
      req.user.id,
      parseInt(itemIndex),
      updateCartItemDto,
    );
    return {
      success: true,
      data: cart,
      message: 'Cart item updated successfully',
    };
  }

  @Delete('items/:itemIndex')
  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Remove item from cart' })
  @ApiParam({ name: 'itemIndex', description: 'Index of the item in cart (0-based)' })
  @ApiResponse({
    status: 200,
    description: 'Item removed from cart successfully',
  })
  @ApiResponse({ status: 400, description: 'Invalid item index' })
  async removeFromCart(@Request() req, @Param('itemIndex') itemIndex: string) {
    const cart = await this.cartService.removeFromCart(req.user.id, parseInt(itemIndex));
    return {
      success: true,
      data: cart,
      message: 'Item removed from cart successfully',
    };
  }

  @Delete('clear')
  @UseGuards(CustomerGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Clear all items from cart' })
  @ApiResponse({
    status: 200,
    description: 'Cart cleared successfully',
  })
  async clearCart(@Request() req) {
    const cart = await this.cartService.clearCart(req.user.id);
    return {
      success: true,
      data: cart,
      message: 'Cart cleared successfully',
    };
  }

  @Get('validate')
  @UseGuards(CustomerGuard)
  @ApiOperation({ summary: 'Validate cart for checkout' })
  @ApiResponse({
    status: 200,
    description: 'Cart validation result',
    schema: {
      example: {
        success: true,
        data: {
          isValid: true,
          errors: [],
          cart: {},
        },
      },
    },
  })
  async validateCart(@Request() req) {
    const validation = await this.cartService.validateCartForCheckout(req.user.id);
    return {
      success: true,
      data: validation,
    };
  }

  // Admin endpoints
  @Get('admin/all')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get all active carts (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Returns all active carts',
  })
  async getAllCarts() {
    const carts = await this.cartService.getAllActiveCarts();
    return {
      success: true,
      data: carts,
    };
  }

  @Get('admin/stats')
  @UseGuards(AdminGuard)
  @ApiOperation({ summary: 'Get cart statistics (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Returns cart statistics',
    schema: {
      example: {
        success: true,
        data: {
          totalActiveCarts: 15,
          totalItemsInCarts: 42,
          averageCartValue: 28.50,
        },
      },
    },
  })
  async getCartStats() {
    const stats = await this.cartService.getCartStats();
    return {
      success: true,
      data: stats,
    };
  }
}
