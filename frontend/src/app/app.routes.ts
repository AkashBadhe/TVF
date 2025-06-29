import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/restaurants',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'restaurants',
    loadChildren: () => import('./restaurants/restaurants.routes').then(m => m.restaurantRoutes)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.routes').then(m => m.cartRoutes)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.routes').then(m => m.orderRoutes)
  },
  {
    path: '**',
    redirectTo: '/restaurants'
  }
];
