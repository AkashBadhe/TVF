import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CustomersService } from '../customers/customers.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private customersService: CustomersService,
  ) {}

  async register(registerDto: RegisterDto) {
    try {
      const customer = await this.customersService.create(registerDto);
      
      // Generate JWT token
      const payload: JwtPayload = {
        sub: (customer as any)._id.toString(),
        email: customer.email,
        role: 'customer',
      };

      const token = this.jwtService.sign(payload);

      // Remove password from response
      const customerObj = (customer as any).toObject();
      const { password, ...customerWithoutPassword } = customerObj;

      return {
        success: true,
        data: {
          token,
          customer: customerWithoutPassword,
        },
      };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error('Registration failed');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find customer by email
    const customer = await this.customersService.findByEmail(email);
    if (!customer) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Validate password
    const isPasswordValid = await this.customersService.validatePassword(customer, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Update last login
    await this.customersService.updateLastLogin((customer as any)._id.toString());

    // Generate JWT token
    const payload: JwtPayload = {
      sub: (customer as any)._id.toString(),
      email: customer.email,
      role: 'customer',
    };

    const token = this.jwtService.sign(payload);

    // Remove password from response
    const customerObj = (customer as any).toObject();
    const { password: _, ...customerWithoutPassword } = customerObj;

    return {
      success: true,
      data: {
        token,
        customer: customerWithoutPassword,
      },
    };
  }

  async adminLogin(loginDto: LoginDto) {
    // For now, we'll use a simple admin check
    // In a real application, you'd have a separate admin collection
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL') || 'admin@restaurant.com';
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD') || 'admin123';

    if (loginDto.email !== adminEmail || loginDto.password !== adminPassword) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    // Generate JWT token for admin
    const payload: JwtPayload = {
      sub: 'admin',
      email: adminEmail,
      role: 'admin',
    };

    const token = this.jwtService.sign(payload);

    return {
      success: true,
      data: {
        token,
        admin: {
          id: 'admin',
          email: adminEmail,
          role: 'admin',
        },
      },
    };
  }

  async validateToken(token: string): Promise<any> {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async refreshToken(userId: string, role: 'customer' | 'admin'): Promise<string> {
    let email: string;

    if (role === 'customer') {
      const customer = await this.customersService.findById(userId);
      if (!customer) {
        throw new UnauthorizedException('Customer not found');
      }
      email = customer.email;
    } else {
      email = this.configService.get<string>('ADMIN_EMAIL') || 'admin@restaurant.com';
    }

    const payload: JwtPayload = {
      sub: userId,
      email,
      role,
    };

    return this.jwtService.sign(payload);
  }

  async getProfile(userId: string, role: 'customer' | 'admin') {
    if (role === 'admin') {
      return {
        success: true,
        data: {
          id: 'admin',
          email: this.configService.get<string>('ADMIN_EMAIL') || 'admin@restaurant.com',
          role: 'admin',
        },
      };
    }

    const customer = await this.customersService.findByIdWithoutPassword(userId);
    if (!customer) {
      throw new UnauthorizedException('Customer not found');
    }

    return {
      success: true,
      data: customer,
    };
  }
}
