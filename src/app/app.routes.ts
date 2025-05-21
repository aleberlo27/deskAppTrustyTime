import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/pages/dashboard/dashboard.component';
import { DASHBOARD_ROUTES } from './modules/pages/dashboard/dashboard.routes';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./modules/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'dashboard',
    children: DASHBOARD_ROUTES
  },
  {
    path: '**',
    redirectTo: 'login',
  }

];
