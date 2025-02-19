import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isAuthenticated = this.authService.isAuthenticated();

      if (isAuthenticated && state.url === '/login') {
        this.router.navigate(['/home']);
        return false;
      }

      if (!this.authService.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }
      return true; 
  }
}
