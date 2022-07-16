import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { RoleType } from 'src/app/core/models/enums/role.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  public isSignedIn: boolean = false;
  public role: RoleType = RoleType.NONE;

  private authSubscription!: Subscription;
  private roleSubscription!: Subscription;

  constructor(private authService: AuthenticationService) {
    // To get rid of facebook's callback characters appended to url
    if (window.location.hash && window.location.hash == '#_=_') {
      window.location.hash = '';
    }
  }

  ngOnInit(): void {
    this.authSubscription = this.authService.isUserAuthenticated.subscribe(isAuthenticated => this.isSignedIn = isAuthenticated);
    this.roleSubscription = this.authService.userRole.subscribe(role => this.role = role);
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.roleSubscription?.unsubscribe();
  }
}