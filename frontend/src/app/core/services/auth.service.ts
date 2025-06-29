import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { 
  User, 
  Customer,
  LoginRequest, 
  RegisterRequest, 
  AuthResponse,
  ApiResponse 
} from '../../shared/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';
  private readonly apiUrl = environment.apiUrl;

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    // Clear any corrupted localStorage data on initialization
    this.clearCorruptedStorage();
  }

  private clearCorruptedStorage(): void {
    try {
      const tokenStr = localStorage.getItem(this.TOKEN_KEY);
      const userStr = localStorage.getItem(this.USER_KEY);
      
      // Test if user data is valid JSON
      if (userStr && userStr !== 'undefined' && userStr !== 'null') {
        JSON.parse(userStr);
      }
    } catch (error) {
      console.warn('Clearing corrupted localStorage data');
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  }

  private getUserFromStorage(): User | null {
    try {
      const userStr = localStorage.getItem(this.USER_KEY);
      if (!userStr || userStr === 'undefined' || userStr === 'null') {
        return null;
      }
      return JSON.parse(userStr);
    } catch (error) {
      console.warn('Error parsing user data from localStorage:', error);
      // Clear invalid data
      localStorage.removeItem(this.USER_KEY);
      return null;
    }
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/register`, data)
      .pipe(
        tap(response => {
          if (response.success) {
            // Set role as customer for registration
            const customerWithRole = { ...response.data.customer, role: 'customer' as const };
            this.setSession({ token: response.data.token, customer: customerWithRole });
          }
        })
      );
  }

  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, data)
      .pipe(
        tap(response => {
          if (response.success) {
            // Set role as customer for regular login
            const customerWithRole = { ...response.data.customer, role: 'customer' as const };
            this.setSession({ token: response.data.token, customer: customerWithRole });
          }
        })
      );
  }

  adminLogin(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/admin-login`, data)
      .pipe(
        tap(response => {
          if (response.success) {
            // Set role as admin for admin login
            const adminWithRole = { ...response.data.customer, role: 'admin' as const };
            this.setSession({ token: response.data.token, customer: adminWithRole });
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }

  isCustomer(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'customer';
  }

  private setSession(authData: { token: string; customer: User }): void {
    localStorage.setItem(this.TOKEN_KEY, authData.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authData.customer));
    this.currentUserSubject.next(authData.customer);
  }

  refreshUserData(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/auth/profile`)
      .pipe(
        tap(response => {
          if (response.success) {
            localStorage.setItem(this.USER_KEY, JSON.stringify(response.data));
            this.currentUserSubject.next(response.data);
          }
        })
      );
  }
}
