import { Routes } from '@angular/router';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { ClientListComponent } from './pages/client-list/client-list.component';
import { InsuranceProfileComponent } from './pages/insurance-profile/insurance-profile.component';
import { InsuranceListComponent } from './pages/insurance-list/insurance-list.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'client-profile/:id',
    component: ClientProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'client-profile',
    component: ClientProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'client-list',
    component: ClientListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'insurance-profile/:id',
    component: InsuranceProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'insurance-profile',
    component: InsuranceProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'insurance-list/:id',
    component: InsuranceListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'insurance-list',
    component: InsuranceListComponent,
    canActivate: [AuthGuard],
  },
];
