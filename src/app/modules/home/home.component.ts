import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnDestroy {
  public isSignedIn: boolean = false;
  public user!: User;

  private authSubscription!: Subscription;
  private userSubscription!: Subscription;

  constructor(private authService: AuthenticationService) {
    // To get rid of facebook's callback characters appended to url
    if (window.location.hash && window.location.hash == '#_=_') {
      window.location.hash = '';
    }

    this.authSubscription = this.authService.isUserAuthenticated.subscribe(isAuthenticated => this.isSignedIn = isAuthenticated);
    this.userSubscription = this.authService.user.subscribe(user => this.user = user);
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
    this.userSubscription?.unsubscribe();
  }
}