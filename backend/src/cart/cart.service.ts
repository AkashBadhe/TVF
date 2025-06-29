import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { Model, Types } from 'mongoose';
import { Cart, CartDocument, CartItem } from './schemas/cart.schema';
import { MenuService } from '../menu/menu.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private menuService: MenuService,
    private configService: ConfigService,
  ) {}

  async getCart(customerId: string): Promise<Cart> {
    let cart = await this.cartModel
      .findOne({ customerId, isActive: true })
      .populate({
        path: 'items.menuItemId',
        select: 'name description price images isAvailable categoryId',
        populate: {
          path: 'categoryId',
          select: 'name',
        },
      })
      .exec();

    if (!cart) {
      // Create a new cart if none exists
      cart = await this.cartModel.create({
        customerId: new Types.ObjectId(customerId),
        items: [],
        subtotal: 0,
        tax: 0,
        deliveryFee: 0,
        total: 0,
        isActive: true,
      });
    }

    // Recalculate totals to ensure accuracy
    await this.recalculateCartTotals(cart);

    return cart;
  }

  async addToCart(customerId: string, addToCartDto: AddToCartDto): Promise<Cart> {
    const { menuItemId, quantity, specialInstructions } = addToCartDto;

    // Validate menu item exists and is available
    const menuItem = await this.menuService.getMenuItemById(menuItemId);
    if (!menuItem.isAvailable) {
      throw new BadRequestException('Menu item is not available');
    }

    // Get or create cart
    let cart = await this.cartModel.findOne({ customerId, isActive: true }).exec();
    if (!cart) {
      cart = await this.cartModel.create({
        customerId: new Types.ObjectId(customerId),
        items: [],
        subtotal: 0,
        tax: 0,
        deliveryFee: 0,
        total: 0,
        isActive: true,
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      item => item.menuItemId.toString() === menuItemId
    );

    if (existingItemIndex >= 0) {
      // Update existing item quantity
      const newQuantity = cart.items[existingItemIndex].quantity + quantity;
      if (newQuantity > 50) {
        throw new BadRequestException('Maximum quantity per item is 50');
      }
      
      cart.items[existingItemIndex].quantity = newQuantity;
      if (specialInstructions) {
        cart.items[existingItemIndex].specialInstructions = specialInstructions;
      }
    } else {
      // Add new item to cart
      const cartItem: CartItem = {
        menuItemId: new Types.ObjectId(menuItemId),
        quantity,
        specialInstructions,
        priceAtTime: menuItem.price,
      };
      cart.items.push(cartItem);
    }

    cart.lastUpdated = new Date();
    await cart.save();

    // Recalculate totals
    await this.recalculateCartTotals(cart);

    return this.getCart(customerId);
  }

  async updateCartItem(customerId: string, itemIndex: number, updateDto: UpdateCartItemDto): Promise<Cart> {
    const cart = await this.cartModel.findOne({ customerId, isActive: true }).exec();
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    if (itemIndex < 0 || itemIndex >= cart.items.length) {
      throw new BadRequestException('Invalid item index');
    }

    // Update the item
    cart.items[itemIndex].quantity = updateDto.quantity;
    if (updateDto.specialInstructions !== undefined) {
      cart.items[itemIndex].specialInstructions = updateDto.specialInstructions;
    }

    cart.lastUpdated = new Date();
    await cart.save();

    // Recalculate totals
    await this.recalculateCartTotals(cart);

    return this.getCart(customerId);
  }

  async removeFromCart(customerId: string, itemIndex: number): Promise<Cart> {
    const cart = await this.cartModel.findOne({ customerId, isActive: true }).exec();
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    if (itemIndex < 0 || itemIndex >= cart.items.length) {
      throw new BadRequestException('Invalid item index');
    }

    // Remove the item
    cart.items.splice(itemIndex, 1);
    cart.lastUpdated = new Date();
    await cart.save();

    // Recalculate totals
    await this.recalculateCartTotals(cart);

    return this.getCart(customerId);
  }

  async clearCart(customerId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ customerId, isActive: true }).exec();
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = [];
    cart.subtotal = 0;
    cart.tax = 0;
    cart.total = 0;
    cart.lastUpdated = new Date();
    await cart.save();

    return this.getCart(customerId);
  }

  async validateCartForCheckout(customerId: string): Promise<{
    isValid: boolean;
    errors: string[];
    cart: Cart;
  }> {
    const cart = await this.getCart(customerId);
    const errors: string[] = [];

    if (cart.items.length === 0) {
      errors.push('Cart is empty');
    }

    // Check minimum order amount
    const minimumOrder = this.configService.get<number>('app.restaurant.minimumOrder') || 15.00;
    if (cart.subtotal < minimumOrder) {
      errors.push(`Minimum order amount is $${minimumOrder.toFixed(2)}`);
    }

    // Validate each item availability
    for (let i = 0; i < cart.items.length; i++) {
      try {
        const menuItem = await this.menuService.getMenuItemById(
          cart.items[i].menuItemId.toString()
        );
        if (!menuItem.isAvailable) {
          errors.push(`Item "${menuItem.name}" is no longer available`);
        }
      } catch (error) {
        errors.push(`Item at position ${i + 1} is no longer available`);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
      cart,
    };
  }

  async archiveCart(customerId: string): Promise<void> {
    // Archive current cart (used after order placement)
    const cart = await this.cartModel.findOne({ customerId, isActive: true }).exec();
    if (cart) {
      cart.isActive = false;
      await cart.save();
    }
  }

  private async recalculateCartTotals(cart: CartDocument): Promise<void> {
    let subtotal = 0;

    // Calculate subtotal from current menu prices
    for (const item of cart.items) {
      try {
        const menuItem = await this.menuService.getMenuItemById(item.menuItemId.toString());
        subtotal += menuItem.price * item.quantity;
        // Update price at time to current price for accuracy
        item.priceAtTime = menuItem.price;
      } catch (error) {
        // If menu item not found, use stored price
        subtotal += item.priceAtTime * item.quantity;
      }
    }

    // Calculate tax
    const taxRate = this.configService.get<number>('app.restaurant.taxRate') || 0.1;
    const tax = subtotal * taxRate;

    // Calculate delivery fee (if applicable)
    const deliveryFee = this.configService.get<number>('app.restaurant.deliveryFee') || 3.99;

    // Calculate total
    const total = subtotal + tax + (subtotal > 0 ? deliveryFee : 0);

    // Update cart totals
    cart.subtotal = Math.round(subtotal * 100) / 100; // Round to 2 decimal places
    cart.tax = Math.round(tax * 100) / 100;
    cart.deliveryFee = subtotal > 0 ? deliveryFee : 0;
    cart.total = Math.round(total * 100) / 100;

    await cart.save();
  }

  // Admin methods
  async getAllActiveCarts(): Promise<Cart[]> {
    return this.cartModel
      .find({ isActive: true })
      .populate('customerId', 'name email')
      .populate({
        path: 'items.menuItemId',
        select: 'name price',
      })
      .sort({ lastUpdated: -1 })
      .exec();
  }

  async getCartStats(): Promise<{
    totalActiveCarts: number;
    totalItemsInCarts: number;
    averageCartValue: number;
  }> {
    const carts = await this.cartModel.find({ isActive: true }).exec();
    
    const totalActiveCarts = carts.length;
    const totalItemsInCarts = carts.reduce((sum, cart) => sum + cart.items.length, 0);
    const totalCartValue = carts.reduce((sum, cart) => sum + cart.total, 0);
    const averageCartValue = totalActiveCarts > 0 ? totalCartValue / totalActiveCarts : 0;

    return {
      totalActiveCarts,
      totalItemsInCarts,
      averageCartValue: Math.round(averageCartValue * 100) / 100,
    };
  }
}
