import { Injectable } from '@angular/core';
import { CanActivate, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private globalService: GlobalService) {}

  canActivate(route: any): boolean {
    const userRole = localStorage.getItem('role');
    const clientId = localStorage.getItem('clientId');

    if (!userRole || (userRole === 'CLIENT' && !clientId)) {
      this.router.navigate(['/login']);
      return false;
    }

    if (userRole === 'CLIENT' && route.routeConfig.path === 'client-list') {
      this.router.navigate(['/client-profile/' + clientId]);
      return false;
    }

    const hasId = route.paramMap.has('id');

    if (route.routeConfig.path === 'insurance-profile' && !hasId) {
      if (userRole === 'CLIENT') {
        this.router.navigate(['/client-profile', clientId]);
        return false;
      } else if (userRole === 'ADMIN') {
        this.router.navigate(['/client-list']);
        return false;
      }
    }

    if (route.routeConfig.path === 'client-profile' && !hasId) {
      if (userRole === 'ADMIN') {
        this.router.navigate(['/client-list']);
        return false;
      } else if (userRole === 'CLIENT') {
        this.globalService.logout();
        return false;
      }
    }

    return true;
  }
}
