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
  loginForm!: FormGroup;    // ! means will be declared later on during execution
  loginErrors: string[] = [];
  loginFormSubmitted: boolean = false;
  isLoading: boolean = false;
  isAlertClosed: boolean = false;
  isRedirected!: boolean;

  get f() { return this.loginForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router) {
      if (this.router.getCurrentNavigation()!.extras.state == undefined)
        this.isRedirected = false;
      else 
      this.isRedirected = this.router.getCurrentNavigation()!.extras.state!['isRedirected'];
    }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(): void {
    this.loginErrors = [];
    this.loginFormSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;

    this.isLoading = false;
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
