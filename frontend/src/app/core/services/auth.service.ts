import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { 
  User, 
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
  ) {}

  private getUserFromStorage(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  register(data: RegisterRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/register`, data)
      .pipe(
        tap(response => {
          if (response.success) {
            this.setSession(response.data);
          }
        })
      );
  }

  login(data: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/login`, data)
      .pipe(
        tap(response => {
          if (response.success) {
            this.setSession(response.data);
          }
        })
      );
  }

  adminLogin(data: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.apiUrl}/auth/admin-login`, data)
      .pipe(
        tap(response => {
          if (response.success) {
            this.setSession(response.data);
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

  private setSession(authResult: AuthResponse): void {
    localStorage.setItem(this.TOKEN_KEY, authResult.access_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(authResult.user));
    this.currentUserSubject.next(authResult.user);
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
