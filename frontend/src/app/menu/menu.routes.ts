import { Routes } from '@angular/router';

export const menuRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./menu-list/menu-list.component').then(c => c.MenuListComponent)
  },
  {
    path: 'item/:id',
    loadComponent: () => import('./menu-item-detail/menu-item-detail.component').then(c => c.MenuItemDetailComponent)
  }
];
