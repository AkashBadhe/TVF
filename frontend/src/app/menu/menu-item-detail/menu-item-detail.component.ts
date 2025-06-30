import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MenuService } from '../../core/services/menu.service';
import { CartService } from '../../core/services/cart.service';
import { type AddToCartDto } from '@tvf/api-client';
import { MenuItem } from '../../shared/models';

@Component({
  selector: 'app-menu-item-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatExpansionModule
  ],
  templateUrl: './menu-item-detail.component.html',
  styleUrls: ['./menu-item-detail.component.scss']
})
export class MenuItemDetailComponent implements OnInit {
  menuItem = signal<MenuItem | null>(null);
  loading = signal(true);
  error = signal<string | null>(null);
  quantity = signal(1);
  selectedCustomizations = signal<Map<string, string[]>>(new Map());
  specialInstructions = signal('');

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const itemId = this.route.snapshot.params['id'];
    if (itemId) {
      this.loadMenuItem(itemId);
    } else {
      this.router.navigate(['/menu']);
    }
  }

  private loadMenuItem(id: string): void {
    this.loading.set(true);
    this.error.set(null);

    this.menuService.getMenuItem(id).subscribe({
      next: (response: any) => {
        if (response.success) {
          this.menuItem.set(response.data);
        } else {
          this.error.set('Menu item not found');
        }
        this.loading.set(false);
      },
      error: (error: any) => {
        console.error('Error loading menu item:', error);
        this.error.set('Failed to load menu item. Please try again.');
        this.loading.set(false);
      }
    });
  }

  increaseQuantity(): void {
    this.quantity.set(this.quantity() + 1);
  }

  decreaseQuantity(): void {
    if (this.quantity() > 1) {
      this.quantity.set(this.quantity() - 1);
    }
  }

  onCustomizationChange(customizationName: string, option: string, selected: boolean): void {
    const current = new Map(this.selectedCustomizations());
    const currentOptions = current.get(customizationName) || [];
    
    if (selected) {
      current.set(customizationName, [...currentOptions, option]);
    } else {
      current.set(customizationName, currentOptions.filter(o => o !== option));
    }
    
    this.selectedCustomizations.set(current);
  }

  isCustomizationSelected(customizationName: string, option: string): boolean {
    const options = this.selectedCustomizations().get(customizationName) || [];
    return options.includes(option);
  }

  calculateTotal(): number {
    const item = this.menuItem();
    if (!item) return 0;

    let total = item.price * this.quantity();
    
    // Add customization costs
    this.selectedCustomizations().forEach((selectedOptions, customizationName) => {
      const customization = item.customizations?.find(c => c.name === customizationName);
      if (customization) {
        selectedOptions.forEach(optionName => {
          const option = customization.options.find(o => o.name === optionName);
          if (option) {
            total += option.price * this.quantity();
          }
        });
      }
    });

    return total;
  }

  addToCart(): void {
    const item = this.menuItem();
    if (!item) return;

    const cartItem: AddToCartDto = {
      menuItemId: item.id,
      quantity: this.quantity(),
      specialInstructions: this.specialInstructions() || undefined
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: (response) => {
        if (response.success) {
          // Navigate back to menu or show success message
          this.router.navigate(['/menu']);
        }
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/menu']);
  }

  getSpiceLevelIcon(level: string): string {
    switch (level) {
      case 'none': return '';
      case 'mild': return '🌶️';
      case 'medium': return '🌶️🌶️';
      case 'hot': return '🌶️🌶️🌶️';
      case 'extra-hot': return '🌶️🌶️🌶️🌶️';
      default: return '';
    }
  }
}
