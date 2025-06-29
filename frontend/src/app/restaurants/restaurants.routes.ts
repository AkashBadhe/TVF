import { Routes } from '@angular/router';

export const restaurantRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./restaurant-list/restaurant-list.component').then(m => m.RestaurantListComponent)
  },
  {
    path: ':id',
    loadComponent: () => import('./restaurant-detail/restaurant-detail.component').then(m => m.RestaurantDetailComponent)
  }
];
