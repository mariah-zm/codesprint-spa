import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { 
  facebook, 
  instagram,
  person,
  NgxBootstrapIconsModule 
} from 'ngx-bootstrap-icons';

import { RouterModule } from '@angular/router';

const icons = {
    facebook,
    instagram,
    person
};

@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    MainLayoutComponent
],
imports: [
    NgxBootstrapIconsModule.pick(icons),
    NgbCollapseModule,
    NgbDropdownModule,
    CommonModule,
    RouterModule
],
exports: [
    NavbarComponent,
    FooterComponent,
    MainLayoutComponent
]
})
export class LayoutModule { }
