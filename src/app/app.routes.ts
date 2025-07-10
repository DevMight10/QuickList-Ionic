import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'welcome',
    loadComponent: () => import('./features/welcome/pages/welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'products',
    loadComponent: () => import('./features/products/pages/product-list/product-list.page').then( m => m.ProductListPage),
    canActivate: [AuthGuard] // Proteger esta ruta
  },
  {
    path: 'product-detail/:id',
    loadComponent: () => import('./features/products/pages/product-detail/product-detail.page').then(m => m.ProductDetailPage),
    canActivate: [AuthGuard] // Proteger esta ruta
  },
  {
    path: 'product-form',
    loadComponent: () => import('./features/products/pages/product-form/product-form.page').then(m => m.ProductFormPage),
    canActivate: [AuthGuard] // Proteger esta ruta
  },
  {
    path: 'product-form/:id',
    loadComponent: () => import('./features/products/pages/product-form/product-form.page').then(m => m.ProductFormPage),
    canActivate: [AuthGuard] // Proteger esta ruta
  },
];
