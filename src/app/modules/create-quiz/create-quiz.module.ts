import { NgModule } from '@angular/core';
import { CreateQuizComponent } from './create-quiz.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateQuizRoutingModule } from "./create-quiz-routing.module";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateQuizComponent
  ],
  imports: [
    SharedModule,
    CreateQuizRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CreateQuizModule { }
