import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './signup/signup.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    InfoComponent
  ],
  imports: [
    SharedModule,
    HomeRoutingModule,
    CommonModule
  ]
})
export class HomeModule { }
