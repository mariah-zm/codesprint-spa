import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.authService.getUserAuthenticationStatus()
      .pipe(
        map((isAuth: boolean) => {
          if (!isAuth) {
            this.router.navigate(['/login'],  { state: { isRedirected: true } });
            return false;
          }

          return true;
        })
      );
  }
}