import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  public isSignedIn: boolean = false;

  private authSubscription!: Subscription;

  constructor(private authService: AuthenticationService)
  {}

  ngOnInit(): void {
    this.authSubscription = this.authService.isUserAuthenticated.subscribe(isAuthenticated => this.isSignedIn = isAuthenticated);
  }
}
