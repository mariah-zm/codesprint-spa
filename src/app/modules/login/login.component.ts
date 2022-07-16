import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ExternalProvider } from 'src/app/core/models/enums/auth-provider.enum';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  isAlertClosed: boolean = false;
  isRedirected!: boolean;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    if (this.router.getCurrentNavigation()!.extras.state == undefined)
      this.isRedirected = false;
    else
      this.isRedirected = this.router.getCurrentNavigation()!.extras.state!['isRedirected'];
  }

  ngOnInit(): void {
  }

  onFacebookLogin(): void {
    this.isLoading = true;
    this.authService.externalLogin(ExternalProvider.Facebook);
  }

  onGoogleLogin() {
    this.isLoading = true;
    this.authService.externalLogin(ExternalProvider.Google);
  }
}
