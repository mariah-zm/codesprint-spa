import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { checkIfUserIsAuthenticated } from './auth-initializer';
import { AuthenticationService } from './services/authentication.service';


@NgModule({
  imports: [HttpClientModule],
  providers: [
    { provide: APP_INITIALIZER, useFactory: checkIfUserIsAuthenticated, multi: true, deps: [AuthenticationService] }
  ]
})
export class CoreModule { }