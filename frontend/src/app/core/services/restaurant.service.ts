import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { 
  RestaurantService as GeneratedRestaurantService,
  type CreateRestaurantDto,
  type UpdateRestaurantDto,
  type RestaurantStatusDto,
  type WeeklyHoursDto
} from '@tvf/api-client';
import {
  Restaurant,
  ApiResponse
} from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor() {}

  // Public Methods
  getPublicInfo(): Observable<any> {
    return from(GeneratedRestaurantService.restaurantControllerGetPublicInfo());
  }

  getContactInfo(): Observable<any> {
    return from(GeneratedRestaurantService.restaurantControllerGetContactInfo());
  }

  getDeliveryInfo(): Observable<any> {
    return from(GeneratedRestaurantService.restaurantControllerGetDeliveryInfo());
  }

  // Admin Methods
  getFullInfo(): Observable<any> {
    return from(GeneratedRestaurantService.restaurantControllerGetFullInfo());
  }

  getSettings(): Observable<any> {
    return from(GeneratedRestaurantService.restaurantControllerGetSettings());
  }

  initialize(): Observable<any> {
    return from(GeneratedRestaurantService.restaurantControllerInitialize());
  }

  create(data: CreateRestaurantDto): Observable<any> {
    return from(GeneratedRestaurantService.restaurantControllerCreate(data));
  }

  update(data: UpdateRestaurantDto): Observable<any> {
    return from(GeneratedRestaurantService.restaurantControllerUpdate(data));
  }

  updateStatus(status: RestaurantStatusDto): Observable<any> {
    return from(GeneratedRestaurantService.restaurantControllerUpdateStatus(status));
  }

  updateBusinessHours(hours: WeeklyHoursDto): Observable<any> {
    return from(GeneratedRestaurantService.restaurantControllerUpdateBusinessHours(hours));
  }

  updateDeliverySettings(): Observable<any> {
    return from(GeneratedRestaurantService.restaurantControllerUpdateDeliverySettings());
  }
}
