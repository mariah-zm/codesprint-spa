import { Component, OnInit } from '@angular/core';
import { ExternalProvider } from 'src/app/core/models/enums/auth-provider.enum';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  isLoading = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
  }

  onFacebookRegister(): void {
    this.isLoading = true;
    this.authService.externalLogin(ExternalProvider.Facebook);
  }

  onGoogleRegister() {
    this.isLoading = true;
    this.authService.externalLogin(ExternalProvider.Google);
  }
}

