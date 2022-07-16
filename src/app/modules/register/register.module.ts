import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommonModule } from '@angular/common';
import { facebook, google, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { RoleComponent } from './role/role.component';

const icons = {
  facebook,
  google
}

@NgModule({
  declarations: [
    RegisterComponent,
    RoleComponent
  ],
  imports: [
    SharedModule,
    RegisterRoutingModule,
    CommonModule,
    NgbAlertModule,
    NgxBootstrapIconsModule.pick(icons)
  ]
})
export class RegisterModule { }
