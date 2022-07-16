import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizInfoResponse } from 'src/app/core/models/quiz-info-response';
import { QuizResponse } from 'src/app/core/models/quiz-response';
import { QuizRetrievalService } from 'src/app/core/services/quiz-retrieval.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html'
})
export class ExploreComponent implements OnInit, OnDestroy {
  quizzes: QuizInfoResponse[] = [];

  private retrievalSubscription!: Subscription;

  constructor(
    private router: Router,
    private retrievalService: QuizRetrievalService
  ) {
    this.retrievalSubscription = this.retrievalService.quizList.subscribe(list => this.quizzes = list);
    this.retrievalSubscription = this.retrievalService.getQuizzes().subscribe(list => this.quizzes = list);
  }

  ngOnInit(): void {
  }

  onStartQuiz(slug: string): void {
    this.retrievalSubscription = this.retrievalService.getQuiz(slug).subscribe(_ => this.router.navigate(['/answer-quiz']));
  }

  ngOnDestroy(): void {
    this.retrievalSubscription?.unsubscribe();
  }

}
