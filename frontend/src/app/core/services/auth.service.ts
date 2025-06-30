import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, from } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { 
  AuthenticationService,
  OpenAPI,
  type LoginDto,
  type RegisterDto
} from '@tvf/api-client';
import { User, AuthResponse } from '../../shared/models';

// Configure the API client
OpenAPI.BASE = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  private currentUserSubject = new BehaviorSubject<User | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    // Clear any corrupted localStorage data on initialization
    this.clearCorruptedStorage();
    
    // Set up authentication token for API client
    const token = this.getToken();
    if (token) {
      OpenAPI.TOKEN = token;
    }
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

  register(data: RegisterDto): Observable<any> {
    return from(AuthenticationService.authControllerRegister(data)).pipe(
      tap(response => {
        if (response) {
          // Set role as customer for registration
          const customerWithRole = { ...response as any, role: 'customer' as const };
          this.setSession({ token: (response as any).token, customer: customerWithRole });
        }
      })
    );
  }

  login(data: LoginDto): Observable<any> {
    return from(AuthenticationService.authControllerLogin(data)).pipe(
      tap(response => {
        if (response) {
          // Set role as customer for regular login
          const customerWithRole = { ...response as any, role: 'customer' as const };
          this.setSession({ token: (response as any).token, customer: customerWithRole });
        }
      })
    );
  }

  adminLogin(data: LoginDto): Observable<any> {
    return from(AuthenticationService.authControllerAdminLogin(data)).pipe(
      tap(response => {
        if (response) {
          // Set role as admin for admin login
          const adminWithRole = { ...response as any, role: 'admin' as const };
          this.setSession({ token: (response as any).token, customer: adminWithRole });
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    OpenAPI.TOKEN = undefined; // Clear API client token
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
    OpenAPI.TOKEN = authData.token; // Set token in API client
  }

  refreshUserData(): Observable<any> {
    return from(AuthenticationService.authControllerGetProfile()).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(response));
          this.currentUserSubject.next(response as User);
        }
      })
    );
  }
}
