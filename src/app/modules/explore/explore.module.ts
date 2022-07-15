import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from './explore.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExploreRoutingModule } from './explore-routing.module';



@NgModule({
  declarations: [
    ExploreComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ExploreRoutingModule
  ]
})
export class ExploreModule { }
