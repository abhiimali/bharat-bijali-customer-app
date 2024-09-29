import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router) { }

  canActivate(): boolean {
    // Check if authToken exists in localStorage
    const token = localStorage.getItem('authToken');

    if (token) {
      return true;
    } else {
      this.router.navigate(['/authentication']);
      return false;
    }
  }
  
}
