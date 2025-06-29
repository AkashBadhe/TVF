import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { RestaurantStatusDto } from './dto/restaurant-status.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name) private restaurantModel: Model<RestaurantDocument>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto) {
    // Check if restaurant already exists
    const existingRestaurant = await this.restaurantModel.findOne();
    if (existingRestaurant) {
      throw new ConflictException('Restaurant information already exists. Use update instead.');
    }

    const restaurant = new this.restaurantModel(createRestaurantDto);
    await restaurant.save();

    return {
      success: true,
      data: restaurant,
      message: 'Restaurant information created successfully',
    };
  }

  async findOne() {
    const restaurant = await this.restaurantModel.findOne();
    
    if (!restaurant) {
      throw new NotFoundException('Restaurant information not found');
    }

    return {
      success: true,
      data: restaurant,
    };
  }

  async getPublicInfo() {
    const restaurant = await this.restaurantModel.findOne().select(
      'name description address phone email hours deliveryFee minimumOrder isOpen logo images cuisineTypes'
    );

    if (!restaurant) {
      throw new NotFoundException('Restaurant information not found');
    }

    // Add current status information
    const currentStatus = this.getCurrentStatus(restaurant);

    return {
      success: true,
      data: {
        ...restaurant.toObject(),
        currentStatus,
      },
    };
  }

  async update(updateRestaurantDto: UpdateRestaurantDto) {
    const restaurant = await this.restaurantModel.findOne();
    
    if (!restaurant) {
      throw new NotFoundException('Restaurant information not found');
    }

    const updatedRestaurant = await this.restaurantModel.findByIdAndUpdate(
      restaurant._id,
      updateRestaurantDto,
      { new: true, runValidators: true }
    );

    return {
      success: true,
      data: updatedRestaurant,
      message: 'Restaurant information updated successfully',
    };
  }

  async updateStatus(statusDto: RestaurantStatusDto) {
    const restaurant = await this.restaurantModel.findOne();
    
    if (!restaurant) {
      throw new NotFoundException('Restaurant information not found');
    }

    const updatedRestaurant = await this.restaurantModel.findByIdAndUpdate(
      restaurant._id,
      { isOpen: statusDto.isOpen },
      { new: true }
    );

    return {
      success: true,
      data: updatedRestaurant,
      message: `Restaurant ${statusDto.isOpen ? 'opened' : 'closed'} successfully`,
    };
  }

  async updateBusinessHours(hours: any) {
    const restaurant = await this.restaurantModel.findOne();
    
    if (!restaurant) {
      throw new NotFoundException('Restaurant information not found');
    }

    const updatedRestaurant = await this.restaurantModel.findByIdAndUpdate(
      restaurant._id,
      { hours },
      { new: true, runValidators: true }
    );

    return {
      success: true,
      data: updatedRestaurant,
      message: 'Business hours updated successfully',
    };
  }

  async updateDeliverySettings(deliveryFee: number, minimumOrder: number) {
    const restaurant = await this.restaurantModel.findOne();
    
    if (!restaurant) {
      throw new NotFoundException('Restaurant information not found');
    }

    const updatedRestaurant = await this.restaurantModel.findByIdAndUpdate(
      restaurant._id,
      { deliveryFee, minimumOrder },
      { new: true, runValidators: true }
    );

    return {
      success: true,
      data: updatedRestaurant,
      message: 'Delivery settings updated successfully',
    };
  }

  async getSettings() {
    const restaurant = await this.restaurantModel.findOne().select(
      'deliveryFee minimumOrder taxRate isOpen hours'
    );

    if (!restaurant) {
      throw new NotFoundException('Restaurant settings not found');
    }

    return {
      success: true,
      data: restaurant,
    };
  }

  private getCurrentStatus(restaurant: RestaurantDocument): any {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toTimeString().slice(0, 5); // HH:MM format

    const todayHours = restaurant.hours[currentDay as keyof typeof restaurant.hours];
    
    if (!todayHours || !todayHours.isOpen) {
      return {
        isCurrentlyOpen: false,
        reason: 'Closed today',
        nextOpenTime: this.getNextOpenTime(restaurant, now),
      };
    }

    const isWithinHours = currentTime >= todayHours.open && currentTime <= todayHours.close;
    const isRestaurantOpen = restaurant.isOpen && isWithinHours;

    return {
      isCurrentlyOpen: isRestaurantOpen,
      reason: !restaurant.isOpen 
        ? 'Temporarily closed' 
        : !isWithinHours 
        ? `Closed - Opens at ${todayHours.open}` 
        : 'Open',
      todayHours: {
        open: todayHours.open,
        close: todayHours.close,
      },
      nextCloseTime: isWithinHours ? todayHours.close : null,
    };
  }

  private getNextOpenTime(restaurant: RestaurantDocument, currentDate: Date): string | null {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDayIndex = currentDate.getDay();
    
    // Check next 7 days
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7;
      const nextDay = days[nextDayIndex];
      const dayHours = restaurant.hours[nextDay as keyof typeof restaurant.hours];
      
      if (dayHours && dayHours.isOpen) {
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + i);
        return `${nextDate.toLocaleDateString()} at ${dayHours.open}`;
      }
    }
    
    return null;
  }

  async getDeliveryInfo() {
    const restaurant = await this.restaurantModel.findOne().select(
      'deliveryFee minimumOrder address'
    );

    if (!restaurant) {
      throw new NotFoundException('Restaurant information not found');
    }

    // Here you could add delivery zone logic
    // For now, we'll return basic delivery info
    return {
      success: true,
      data: {
        deliveryFee: restaurant.deliveryFee,
        minimumOrder: restaurant.minimumOrder,
        estimatedDeliveryTime: '30-45 minutes',
        deliveryRadius: '5 miles',
        address: restaurant.address,
      },
    };
  }

  async getContactInfo() {
    const restaurant = await this.restaurantModel.findOne().select(
      'name phone email address'
    );

    if (!restaurant) {
      throw new NotFoundException('Restaurant information not found');
    }

    return {
      success: true,
      data: restaurant,
    };
  }

  async initializeRestaurant() {
    // Check if restaurant info already exists
    const existingRestaurant = await this.restaurantModel.findOne();
    if (existingRestaurant) {
      return {
        success: true,
        data: existingRestaurant,
        message: 'Restaurant information already exists',
      };
    }

    // Create default restaurant information
    const defaultRestaurant = {
      name: 'TVF Restaurant',
      description: 'Delicious food delivered to your door',
      address: {
        street: '123 Main Street',
        city: 'New York',
        zipCode: '10001',
        country: 'USA',
      },
      phone: '+1 (555) 123-4567',
      email: 'info@tvfrestaurant.com',
      hours: {
        monday: { open: '11:00', close: '22:00', isOpen: true },
        tuesday: { open: '11:00', close: '22:00', isOpen: true },
        wednesday: { open: '11:00', close: '22:00', isOpen: true },
        thursday: { open: '11:00', close: '22:00', isOpen: true },
        friday: { open: '11:00', close: '23:00', isOpen: true },
        saturday: { open: '11:00', close: '23:00', isOpen: true },
        sunday: { open: '12:00', close: '21:00', isOpen: true },
      },
      deliveryFee: 3.99,
      minimumOrder: 15.0,
      taxRate: 0.1,
      isOpen: true,
      cuisineTypes: ['American', 'Fast Food', 'Comfort Food'],
    };

    const restaurant = new this.restaurantModel(defaultRestaurant);
    await restaurant.save();

    return {
      success: true,
      data: restaurant,
      message: 'Restaurant information initialized successfully',
    };
  }
}
