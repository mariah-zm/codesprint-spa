import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { NavbarScrollAnimation } from 'src/app/shared/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  animations: [NavbarScrollAnimation]
})
export class NavbarComponent implements OnInit, OnDestroy {
  public isMenuCollapsed: boolean = true;
  public isSignedIn: boolean = false;
  isScrolled: string = "noScroll";
  accountType = "teacher";

  private authSubscription!: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router)
  {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isUserAuthenticated.subscribe(isAuthenticated => this.isSignedIn = isAuthenticated);
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
  }

}
