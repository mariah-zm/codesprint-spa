import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnswerQuizComponent } from './answer-quiz.component';
import { ResultComponent } from './result/result.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnswerQuizRoutingModule } from './answer-quiz-routing.module';



@NgModule({
  declarations: [
    AnswerQuizComponent,
    ResultComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AnswerQuizRoutingModule
  ]
})
export class AnswerQuizModule { }
