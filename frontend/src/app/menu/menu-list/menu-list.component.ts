import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MenuService } from '../../core/services/menu.service';
import { CartService, AddToCartRequest } from '../../core/services/cart.service';
import { MenuItem, Category, MenuFilters } from '../../shared/models';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  // Signals for reactive state management
  menuItems = signal<MenuItem[]>([]);
  categories = signal<Category[]>([]);
  loading = signal(true);
  error = signal<string | null>(null);
  
  // Filter signals
  searchTerm = signal('');
  selectedCategory = signal<string>('');
  isVegetarian = signal(false);
  isVegan = signal(false);
  isGlutenFree = signal(false);
  selectedSpiceLevel = signal<string>('');
  priceRange = signal({ min: 0, max: 100 });

  // Computed filtered menu items
  filteredMenuItems = computed(() => {
    let items = this.menuItems();
    const search = this.searchTerm().toLowerCase();
    const category = this.selectedCategory();
    const vegetarian = this.isVegetarian();
    const vegan = this.isVegan();
    const glutenFree = this.isGlutenFree();
    const spiceLevel = this.selectedSpiceLevel();
    const price = this.priceRange();

    if (search) {
      items = items.filter(item => 
        item.name.toLowerCase().includes(search) ||
        item.description.toLowerCase().includes(search)
      );
    }

    if (category) {
      items = items.filter(item => {
        const itemCategory = typeof item.category === 'string' ? item.category : item.category.id;
        return itemCategory === category;
      });
    }

    if (vegetarian) {
      items = items.filter(item => item.isVegetarian);
    }

    if (vegan) {
      items = items.filter(item => item.isVegan);
    }

    if (glutenFree) {
      items = items.filter(item => item.isGlutenFree);
    }

    if (spiceLevel) {
      items = items.filter(item => item.spiceLevel === spiceLevel);
    }

    items = items.filter(item => item.price >= price.min && item.price <= price.max);

    return items;
  });

  spiceLevels = ['none', 'mild', 'medium', 'hot', 'extra-hot'];

  constructor(
    private menuService: MenuService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadMenuData();
  }

  private loadMenuData(): void {
    this.loading.set(true);
    this.error.set(null);

    // Load categories first
    this.menuService.getCategories().subscribe({
      next: (response) => {
        if (response.success) {
          this.categories.set(response.data);
        }
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });

    // Load menu items
    this.menuService.getMenuItems().subscribe({
      next: (response) => {
        if (response.success) {
          this.menuItems.set(response.data.items);
          // Update price range based on actual menu items
          const prices = response.data.items.map((item: MenuItem) => item.price);
          if (prices.length > 0) {
            const minPrice = Math.min(...prices);
            const maxPrice = Math.max(...prices);
            this.priceRange.set({ min: minPrice, max: maxPrice });
          }
        }
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading menu items:', error);
        this.error.set('Failed to load menu items. Please try again.');
        this.loading.set(false);
      }
    });
  }

  reloadMenuData(): void {
    this.loadMenuData();
  }

  addToCart(menuItem: MenuItem): void {
    const cartItem: AddToCartRequest = {
      menuItem: menuItem.id,
      quantity: 1,
      customizations: []
    };

    this.cartService.addToCart(cartItem).subscribe({
      next: (response) => {
        if (response.success) {
          // Show success message or toast
          console.log('Added to cart successfully');
        }
      },
      error: (error) => {
        console.error('Error adding to cart:', error);
      }
    });
  }

  clearFilters(): void {
    this.searchTerm.set('');
    this.selectedCategory.set('');
    this.isVegetarian.set(false);
    this.isVegan.set(false);
    this.isGlutenFree.set(false);
    this.selectedSpiceLevel.set('');
    const items = this.menuItems();
    if (items.length > 0) {
      const prices = items.map((item: MenuItem) => item.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      this.priceRange.set({ min: minPrice, max: maxPrice });
    }
  }

  getCategoryName(categoryId: string): string {
    const category = this.categories().find(c => c.id === categoryId);
    return category?.name || 'Unknown Category';
  }

  getCategoryIdFromItem(item: MenuItem): string {
    return typeof item.category === 'string' ? item.category : item.category.id;
  }

  getSpiceLevelIcon(level: string): string {
    switch (level) {
      case 'none': return '';
      case 'mild': return '●'; // Single dot for mild
      case 'medium': return '●●'; // Double dot for medium
      case 'hot': return '●●●'; // Triple dot for hot
      case 'extra-hot': return '●●●●'; // Quad dot for extra hot
      default: return '';
    }
  }

  getSpiceLevelColor(level: string): string {
    switch (level) {
      case 'mild': return '#4caf50'; // Green for mild
      case 'medium': return '#ff9800'; // Orange for medium
      case 'hot': return '#f44336'; // Red for hot
      case 'extra-hot': return '#d32f2f'; // Dark red for extra hot
      default: return '#666'; // Default gray
    }
  }
}
