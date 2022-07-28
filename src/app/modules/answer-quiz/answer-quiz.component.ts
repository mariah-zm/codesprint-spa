import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizQuestion } from 'src/app/core/models/quiz-question';
import { QuizResponse } from 'src/app/core/models/quiz-response';
import { QuizResult } from 'src/app/core/models/quiz-result';
import { QuizResultService } from 'src/app/core/services/quiz-result.service';
import { QuizRetrievalService } from 'src/app/core/services/quiz-retrieval.service';

@Component({
  selector: 'app-answer-quiz',
  templateUrl: './answer-quiz.component.html'
})
export class AnswerQuizComponent implements OnInit {
  quiz!: QuizResponse;
  currentQuestion!: QuizQuestion;

  currentQues = 1;
  score = 0;
  progress = 0;

  chosenAnswers: number[] = [];
  missingAnswer = false;

  private retrievalSubscription!: Subscription;  

  constructor(
    private router: Router,
    private quizResultService: QuizResultService,
    private retrievalService: QuizRetrievalService
  ) {
    // To retrieve quiz data and answers from BE using id sent from redirect
    this.retrievalSubscription = this.retrievalService.quiz.subscribe(quiz => this.quiz = quiz); 
  }

  ngOnInit(): void {
    // Set first question
    this.currentQuestion = this.quiz.questions[0];
  }

  onChangeSingle(choice: number): void {
    this.chosenAnswers[0] = choice;
  }

  onChangeMultiple(choice: number): void {
    this.chosenAnswers.push(choice);
  }

  onNext(): void {
    this.processAnswer();

    // Set next question
    this.currentQues++;
    this.currentQuestion = this.quiz.questions[this.currentQues - 1];
    this.progress = (this.currentQues - 1) / this.quiz.questions.length * 100;
  }

  onFinish(): void {
    this.processAnswer();

    // Create result object
    const passed = this.score >= this.quiz.passingScore;
    var result!: QuizResult;

    if (passed)
      result = new QuizResult(passed, this.quiz.msgSuccess, this.score);
    else
      result = new QuizResult(passed, this.quiz.msgFail, this.score);

    // Redirect to results screen
    this.quizResultService.updateQuizResult(result);
    this.router.navigate(['answer-quiz/result']);
  }

  private processAnswer(): void {
    // Validate form
    if (this.chosenAnswers.length == 0) {
      this.missingAnswer = true;
      return;
    }

    // Check if answer is correct
    this.chosenAnswers.forEach(choice => {
      const chosen = this.currentQuestion.answers[choice]
      if (chosen.correct)
        this.score += chosen.score;
    })

    // Resetting variables
    this.missingAnswer = false;
    this.chosenAnswers = [];
  }

  ngOnDestroy(): void {
    this.retrievalSubscription?.unsubscribe();
  }

}
