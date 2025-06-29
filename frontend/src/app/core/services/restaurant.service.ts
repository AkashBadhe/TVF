import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Restaurant,
  ApiResponse
} from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private readonly apiUrl = `${environment.apiUrl}/restaurant`;

  constructor(private http: HttpClient) {}

  getRestaurantInfo(): Observable<ApiResponse<Restaurant>> {
    return this.http.get<ApiResponse<Restaurant>>(this.apiUrl);
  }

  // Admin Methods
  updateRestaurantInfo(data: Partial<Restaurant>): Observable<ApiResponse<Restaurant>> {
    return this.http.put<ApiResponse<Restaurant>>(this.apiUrl, data);
  }

  updateBusinessHours(
    businessHours: Restaurant['businessHours']
  ): Observable<ApiResponse<Restaurant>> {
    return this.http.put<ApiResponse<Restaurant>>(`${this.apiUrl}/business-hours`, {
      businessHours
    });
  }

  updateDeliverySettings(
    deliverySettings: Restaurant['deliverySettings']
  ): Observable<ApiResponse<Restaurant>> {
    return this.http.put<ApiResponse<Restaurant>>(`${this.apiUrl}/delivery-settings`, {
      deliverySettings
    });
  }

  updateContactInfo(
    contactInfo: Restaurant['contactInfo']
  ): Observable<ApiResponse<Restaurant>> {
    return this.http.put<ApiResponse<Restaurant>>(`${this.apiUrl}/contact-info`, {
      contactInfo
    });
  }
}
