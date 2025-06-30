// Example of how to use the generated types in your services
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { 
  LoginRequest, 
  RegisterRequest, 
  ApiResponse, 
  AuthResponse,
  operations 
} from '../shared/generated-types';

@Injectable({
  providedIn: 'root'
})
export class TypedAuthService {
  private readonly baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Type-safe login method
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/auth/login`, 
      credentials
    );
  }

  // Type-safe register method  
  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/auth/register`, 
      userData
    );
  }

  // Using operation types for even more type safety
  getProfile(): Observable<operations['AuthController_getProfile']['responses']['200']['content']> {
    return this.http.get(`${this.baseUrl}/auth/profile`);
  }
}
