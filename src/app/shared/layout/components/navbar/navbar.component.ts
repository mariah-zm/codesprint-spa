import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoleType } from 'src/app/core/models/enums/role.enum';
import { User } from 'src/app/core/models/user';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NavbarScrollAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  animations: [NavbarScrollAnimation]
})
export class NavbarComponent implements OnDestroy {
  public isMenuCollapsed: boolean = true;
  public isSignedIn: boolean = false;
  public user!: User;

  isScrolled: string = "noScroll";

  private authSubscription!: Subscription;
  private userSubscription!: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router) {
    this.authSubscription = this.authService.isUserAuthenticated.subscribe(isAuthenticated => this.isSignedIn = isAuthenticated);
    this.userSubscription = this.authService.user.subscribe(user => this.user = user);
  }

  onLogout(): void {
    this.authSubscription = this.authService.logout()
      .subscribe(_ =>
        this.router.navigate([''])
          .then(() => {
            window.location.reload();
          }));
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled = window.pageYOffset > 0 ? "scroll" : "noScroll";
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }

}
