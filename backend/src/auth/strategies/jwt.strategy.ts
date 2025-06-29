import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CustomersService } from '../../customers/customers.service';

export interface JwtPayload {
  sub: string; // customer ID
  email: string;
  role: 'customer' | 'admin';
  iat?: number;
  exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private customersService: CustomersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('app.jwt.secret'),
    });
  }

  async validate(payload: JwtPayload) {
    try {
      // For admin users, we might want to validate against a different service
      if (payload.role === 'admin') {
        // TODO: Implement admin validation when admin module is created
        return {
          id: payload.sub,
          email: payload.email,
          role: payload.role,
        };
      }

      // For customer users, validate against customer service
      const customer = await this.customersService.findById(payload.sub);
      if (!customer || !customer.isActive) {
        throw new UnauthorizedException('Customer not found or inactive');
      }

      return {
        id: (customer as any).id,
        email: customer.email,
        name: customer.name,
        role: payload.role,
        customer,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
