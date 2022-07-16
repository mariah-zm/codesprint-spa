import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quiz } from 'src/app/core/models/quiz';
import { QuizCreationService } from 'src/app/core/services/quiz-creation.service';

@Component({
  selector: 'app-breakdown',
  templateUrl: './breakdown.component.html'
})
export class BreakdownComponent implements OnDestroy {
  quiz!: Quiz;

  isSaved = false;
  isAlertClosed = true;
  submitClicked = false;
  error = "";

  private quizSubscription!: Subscription;

  constructor(
    private quizService: QuizCreationService
  ) {
    this.quizSubscription = this.quizService.quiz.subscribe(quiz => this.quiz = quiz);
  }
  
  onSubmit(): void {
    this.submitClicked = true;
    this.error = "";
    
    if (this.quiz.questions.length == 0) {
      this.error = "You must add a question first!";
      return;
    } if (this.isSaved)
      return; // not saving more than once

    // sending quiz to BE
    this.quizSubscription = this.quizService.submitQuiz()
    .subscribe(_ => 
      this.isSaved = true
    );

    if (!this.isSaved)
      this.error = "Could not save! An error occured"
  }

  ngOnDestroy(): void {
    this.quizSubscription?.unsubscribe();
  }

}
