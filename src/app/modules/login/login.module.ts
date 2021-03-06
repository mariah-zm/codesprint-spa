import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { CommonModule } from '@angular/common';
import { facebook, google, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

const icons = {
  facebook,
  google
}

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule,
    CommonModule,
    NgbAlertModule,
    NgxBootstrapIconsModule.pick(icons)
  ]
})
export class LoginModule { }
