import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quiz } from 'src/app/core/models/quiz';
import { QuizCreationService } from 'src/app/core/services/quiz-creation.service';

@Component({
  selector: 'app-breakdown',
  templateUrl: './breakdown.component.html'
})
export class BreakdownComponent implements OnInit {
  quiz!: Quiz;

  isSaved = false;
  isAlertClosed = true;
  submitClicked = false;

  private quizSubscription!: Subscription;

  constructor(
    private quizService: QuizCreationService
  ) {
    this.quizSubscription = this.quizService.quiz.subscribe(quiz => this.quiz = quiz);
    console.log(this.quiz);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.submitClicked = true;
    
    if (this.quiz.questions.length == 0)
      return;
    if (this.isSaved)
      return; // not saving more than once

    // To send quiz to BE
    
    this.isSaved = true;
  }

  ngOnDestroy(): void {
    this.quizSubscription?.unsubscribe();
  }

}
