import { Routes } from '@angular/router';
import { authGuard, adminGuard, customerGuard, guestGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadComponent: () => import('./shared/components/simple-menu/simple-menu.component').then(c => c.SimpleMenuComponent)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canActivate: [guestGuard]
  },
  {
    path: 'access-denied',
    loadComponent: () => import('./shared/components/access-denied/access-denied.component').then(c => c.AccessDeniedComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];
