import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Observable } from 'rxjs';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';
import { User } from './shared/models';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    RouterModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'Food Ordering App';
  currentUser$: Observable<User | null>;
  cartItemCount = 0;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit() {
    // Subscribe to cart changes to update cart badge
    this.authService.currentUser$.subscribe(user => {
      if (user && user.role === 'customer') {
        this.loadCartItemCount();
      } else {
        this.cartItemCount = 0;
      }
    });
  }

  private loadCartItemCount() {
    this.cartService.getCart().subscribe({
      next: (response) => {
        if (response.success) {
          this.cartItemCount = response.data.items.reduce((total, item) => total + item.quantity, 0);
        }
      },
      error: () => {
        this.cartItemCount = 0;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  navigateToOrders() {
    this.router.navigate(['/orders']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/auth/register']);
  }
}
