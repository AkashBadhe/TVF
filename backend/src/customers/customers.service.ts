import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { Customer, CustomerDocument } from './schemas/customer.schema';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>,
  ) {}

  async create(registerDto: RegisterDto): Promise<Customer> {
    const { email, password, name, phone } = registerDto;

    // Check if customer already exists
    const existingCustomer = await this.customerModel.findOne({ email }).exec();
    if (existingCustomer) {
      throw new ConflictException('Customer with this email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create customer
    const customer = new this.customerModel({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    return customer.save();
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return this.customerModel.findOne({ email, isActive: true }).exec();
  }

  async findById(id: string): Promise<Customer | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.customerModel.findById(id).exec();
  }

  async findByIdWithoutPassword(id: string): Promise<Omit<Customer, 'password'> | null> {
    if (!Types.ObjectId.isValid(id)) {
      return null;
    }
    return this.customerModel.findById(id).select('-password').exec();
  }

  async validatePassword(customer: Customer, password: string): Promise<boolean> {
    return bcrypt.compare(password, customer.password);
  }

  async updateLastLogin(customerId: string): Promise<void> {
    await this.customerModel
      .findByIdAndUpdate(customerId, { lastLoginAt: new Date() })
      .exec();
  }

  async changePassword(customerId: string, currentPassword: string, newPassword: string): Promise<void> {
    const customer = await this.findById(customerId);
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // Verify current password
    const isCurrentPasswordValid = await this.validatePassword(customer, currentPassword);
    if (!isCurrentPasswordValid) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await this.customerModel
      .findByIdAndUpdate(customerId, { password: hashedNewPassword })
      .exec();
  }

  async updateProfile(customerId: string, updateData: Partial<Pick<Customer, 'name' | 'phone'>>): Promise<Customer> {
    const customer = await this.customerModel
      .findByIdAndUpdate(customerId, updateData, { new: true })
      .select('-password')
      .exec();

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async addAddress(customerId: string, address: Customer['addresses'][0]): Promise<Customer> {
    const customer = await this.customerModel.findById(customerId).exec();
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    // If this is set as default, unset other default addresses
    if (address.isDefault) {
      customer.addresses.forEach(addr => addr.isDefault = false);
    }

    customer.addresses.push(address);
    await customer.save();

    return this.findByIdWithoutPassword(customerId) as Promise<Customer>;
  }

  async updateAddress(customerId: string, addressIndex: number, addressUpdate: Partial<Customer['addresses'][0]>): Promise<Customer> {
    const customer = await this.customerModel.findById(customerId).exec();
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (addressIndex < 0 || addressIndex >= customer.addresses.length) {
      throw new BadRequestException('Invalid address index');
    }

    // If setting as default, unset other default addresses
    if (addressUpdate.isDefault) {
      customer.addresses.forEach((addr, index) => {
        if (index !== addressIndex) {
          addr.isDefault = false;
        }
      });
    }

    // Update the address
    Object.assign(customer.addresses[addressIndex], addressUpdate);
    await customer.save();

    return this.findByIdWithoutPassword(customerId) as Promise<Customer>;
  }

  async removeAddress(customerId: string, addressIndex: number): Promise<Customer> {
    const customer = await this.customerModel.findById(customerId).exec();
    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    if (addressIndex < 0 || addressIndex >= customer.addresses.length) {
      throw new BadRequestException('Invalid address index');
    }

    customer.addresses.splice(addressIndex, 1);
    await customer.save();

    return this.findByIdWithoutPassword(customerId) as Promise<Customer>;
  }

  async updatePreferences(customerId: string, preferences: Partial<Customer['preferences']>): Promise<Customer> {
    const customer = await this.customerModel
      .findByIdAndUpdate(
        customerId,
        { $set: { preferences } },
        { new: true }
      )
      .select('-password')
      .exec();

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return customer;
  }

  async deactivateAccount(customerId: string): Promise<void> {
    const result = await this.customerModel
      .findByIdAndUpdate(customerId, { isActive: false })
      .exec();

    if (!result) {
      throw new NotFoundException('Customer not found');
    }
  }

  // Admin methods
  async getAllCustomers(page: number = 1, limit: number = 20): Promise<{
    customers: Customer[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const skip = (page - 1) * limit;

    const [customers, total] = await Promise.all([
      this.customerModel
        .find()
        .select('-password')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.customerModel.countDocuments().exec(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      customers,
      total,
      page,
      totalPages,
    };
  }
}
