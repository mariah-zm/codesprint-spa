import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuizResult } from 'src/app/core/models/quiz-result';
import { QuizResultService } from 'src/app/core/services/quiz-result.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit, OnDestroy {
  result!: QuizResult;

  private resultSubscription!: Subscription;

  constructor(private quizResultService: QuizResultService) {
  }

  ngOnInit(): void {
    this.resultSubscription = this.quizResultService.quizResult.subscribe(result => this.result = result);
  }

  ngOnDestroy(): void {
    this.resultSubscription?.unsubscribe();
  }

}
