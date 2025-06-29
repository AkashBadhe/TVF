import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UploadResponse, ApiResponse } from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private readonly apiUrl = `${environment.apiUrl}/upload`;
  private readonly uploadUrl = environment.uploadUrl;

  constructor(private http: HttpClient) {}

  // Menu Item Images
  uploadMenuItemImage(menuItemId: string, file: File): Observable<ApiResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<ApiResponse<UploadResponse>>(`${this.apiUrl}/menu-item/${menuItemId}/image`, formData);
  }

  uploadMenuItemImages(menuItemId: string, files: File[]): Observable<ApiResponse<UploadResponse[]>> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    return this.http.post<ApiResponse<UploadResponse[]>>(`${this.apiUrl}/menu-item/${menuItemId}/images`, formData);
  }

  deleteMenuItemImage(menuItemId: string, imageUrl: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/menu-item/${menuItemId}/image?imageUrl=${encodeURIComponent(imageUrl)}`);
  }

  // Category Images
  uploadCategoryImage(categoryId: string, file: File): Observable<ApiResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append('image', file);
    return this.http.post<ApiResponse<UploadResponse>>(`${this.apiUrl}/category/${categoryId}/image`, formData);
  }

  deleteCategoryImage(categoryId: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/category/${categoryId}/image`);
  }

  // Restaurant Images
  uploadRestaurantLogo(file: File): Observable<ApiResponse<UploadResponse>> {
    const formData = new FormData();
    formData.append('logo', file);
    return this.http.post<ApiResponse<UploadResponse>>(`${this.apiUrl}/restaurant/logo`, formData);
  }

  uploadRestaurantImages(files: File[]): Observable<ApiResponse<UploadResponse[]>> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });
    return this.http.post<ApiResponse<UploadResponse[]>>(`${this.apiUrl}/restaurant/images`, formData);
  }

  deleteRestaurantLogo(): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/restaurant/logo`);
  }

  deleteRestaurantImage(imageUrl: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/restaurant/image?imageUrl=${encodeURIComponent(imageUrl)}`);
  }

  // Utility Methods
  getFileUrl(type: string, filename: string): string {
    return `${this.uploadUrl}/${type}/${filename}`;
  }

  getFileInfo(type: string, filename: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/info/${type}/${filename}`);
  }
}
