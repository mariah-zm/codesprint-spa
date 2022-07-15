import { NgModule } from '@angular/core';
import { CreateQuizComponent } from './create-quiz.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateQuizRoutingModule } from "./create-quiz-routing.module";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { QuizInfoComponent } from './quiz-info/quiz-info.component';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component';
import { BreakdownComponent } from './breakdown/breakdown.component';



@NgModule({
  declarations: [
    CreateQuizComponent,
    QuizInfoComponent,
    QuizQuestionsComponent,
    BreakdownComponent
  ],
  imports: [
    SharedModule,
    CreateQuizRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class CreateQuizModule { }
