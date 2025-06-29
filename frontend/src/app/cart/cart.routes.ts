import { Routes } from '@angular/router';

export const cartRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./cart-view/cart-view.component').then(m => m.CartViewComponent)
  }
];
