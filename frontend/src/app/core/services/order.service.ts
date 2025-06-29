import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Order,
  ApiResponse,
  PaginatedResponse,
  OrderFilters
} from '../../shared/models';

export interface CreateOrderRequest {
  deliveryAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  contactPhone: string;
  paymentMethod: 'cash' | 'card' | 'online';
  specialInstructions?: string;
}

export interface OrderStats {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  ordersByStatus: Record<string, number>;
  monthlyStats: Array<{
    month: string;
    orders: number;
    revenue: number;
  }>;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly apiUrl = `${environment.apiUrl}/orders`;

  constructor(private http: HttpClient) {}

  // Customer Methods
  createOrder(orderData: CreateOrderRequest): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(this.apiUrl, orderData);
  }

  getMyOrders(
    page: number = 1,
    limit: number = 10,
    status?: string
  ): Observable<ApiResponse<PaginatedResponse<Order>>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get<ApiResponse<PaginatedResponse<Order>>>(`${this.apiUrl}/my-orders`, { params });
  }

  getOrder(id: string): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`${this.apiUrl}/${id}`);
  }

  cancelOrder(id: string): Observable<ApiResponse<Order>> {
    return this.http.patch<ApiResponse<Order>>(`${this.apiUrl}/${id}/cancel`, {});
  }

  // Admin Methods
  getAllOrders(
    page: number = 1,
    limit: number = 10,
    filters?: OrderFilters
  ): Observable<ApiResponse<PaginatedResponse<Order>>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters) {
      if (filters.status) params = params.set('status', filters.status);
      if (filters.customer) params = params.set('customer', filters.customer);
      if (filters.dateRange) {
        params = params.set('startDate', filters.dateRange.start.toISOString());
        params = params.set('endDate', filters.dateRange.end.toISOString());
      }
    }

    return this.http.get<ApiResponse<PaginatedResponse<Order>>>(`${this.apiUrl}/admin/all`, { params });
  }

  updateOrderStatus(
    id: string,
    status: Order['status']
  ): Observable<ApiResponse<Order>> {
    return this.http.patch<ApiResponse<Order>>(`${this.apiUrl}/admin/${id}/status`, { status });
  }

  getOrderStats(): Observable<ApiResponse<OrderStats>> {
    return this.http.get<ApiResponse<OrderStats>>(`${this.apiUrl}/admin/stats`);
  }

  assignDeliveryTime(
    id: string,
    estimatedDeliveryTime: Date
  ): Observable<ApiResponse<Order>> {
    return this.http.patch<ApiResponse<Order>>(`${this.apiUrl}/admin/${id}/delivery-time`, {
      estimatedDeliveryTime: estimatedDeliveryTime.toISOString()
    });
  }
}
