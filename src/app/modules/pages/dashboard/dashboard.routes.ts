import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadComponent: () => import('../dashboard/home/home.component').then(m => m.HomeComponent),
      },
      {
        path: 'workers',
        children: [
          {
            path: '',
            loadComponent: () => import('../dashboard/workers/workers.component').then(m => m.WorkersComponent),
          }
        ]
      },
      {
        path: 'companies',
        children: [
          {
            path: '',
            loadComponent: () => import('../dashboard/companies/companies.component').then(m => m.CompaniesComponent),
          }
        ]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ]
  }
];
