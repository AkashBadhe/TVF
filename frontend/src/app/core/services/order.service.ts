import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { 
  OrdersService as GeneratedOrdersService,
  type CreateOrderDto,
  type UpdateOrderStatusDto
} from '@tvf/api-client';
import {
  Order,
  ApiResponse,
  PaginatedResponse,
  OrderFilters
} from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() {}

  // Customer Methods
  createOrder(orderData: CreateOrderDto): Observable<any> {
    return from(GeneratedOrdersService.ordersControllerPlaceOrder(orderData));
  }

  getMyOrders(
    page: number = 1,
    limit: number = 10,
    status?: string,
    orderType?: string,
    paymentMethod?: string
  ): Observable<any> {
    const queryParams: any = { page, limit };
    if (status) queryParams.status = status;
    if (orderType) queryParams.orderType = orderType;
    if (paymentMethod) queryParams.paymentMethod = paymentMethod;

    return from(GeneratedOrdersService.ordersControllerGetMyOrders(queryParams));
  }

  getOrder(id: string): Observable<any> {
    return from(GeneratedOrdersService.ordersControllerGetOrderById(id));
  }

  trackOrder(orderNumber: string): Observable<any> {
    return from(GeneratedOrdersService.ordersControllerTrackOrder(orderNumber));
  }

  cancelOrder(id: string): Observable<any> {
    return from(GeneratedOrdersService.ordersControllerCancelOrder(id));
  }

  // Admin Methods
  getAllOrders(
    page: number = 1,
    limit: number = 10,
    filters?: OrderFilters
  ): Observable<any> {
    const queryParams: any = { page, limit };

    if (filters) {
      if (filters.status) queryParams.status = filters.status;
      if (filters.customer) queryParams.customerEmail = filters.customer;
      if (filters.dateRange) {
        queryParams.dateFrom = filters.dateRange.start.toISOString();
        queryParams.dateTo = filters.dateRange.end.toISOString();
      }
    }

    return from(GeneratedOrdersService.ordersControllerGetAllOrders(queryParams));
  }

  updateOrderStatus(id: string, status: UpdateOrderStatusDto): Observable<any> {
    return from(GeneratedOrdersService.ordersControllerUpdateOrderStatus(id, status));
  }

  getOrderStats(): Observable<any> {
    return from(GeneratedOrdersService.ordersControllerGetOrderStats());
  }

  adminCancelOrder(id: string): Observable<any> {
    return from(GeneratedOrdersService.ordersControllerAdminCancelOrder(id));
  }
}
