import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionType } from 'src/app/core/models/enums/question-type.enum';
import { QuizQuestion } from 'src/app/core/models/quiz-question';
import { QuizResponse } from 'src/app/core/models/quiz-response';
import { QuizResult } from 'src/app/core/models/quiz-result';
import { QuizResultService } from 'src/app/core/services/quiz-result.service';

@Component({
  selector: 'app-answer-quiz',
  templateUrl: './answer-quiz.component.html'
})
export class AnswerQuizComponent implements OnInit {
  quiz!: QuizResponse;
  progress!: number;
  currentQuestion!: QuizQuestion;

  currentQues = 1;
  score = 0;

  constructor(
    private router: Router,
    private quizResultService: QuizResultService
  ) {
    // To retrieve quiz data and answers from BE using id sent from redirect
    this.quiz = new QuizResponse();
    this.currentQuestion = this.quiz.questions[0];
    this.progress = (this.currentQues - 1) / this.quiz.questions.length * 100;
  }

  ngOnInit(): void {

  }

  onNext(): void {
    // To check if answer is correct
    this.currentQues++;
    this.currentQuestion = this.quiz.questions[this.currentQues - 1];
    this.progress = (this.currentQues - 1) / this.quiz.questions.length * 100;
  }

  onFinish(): void {
    const passed = this.score > this.quiz.passingScore;
    var result!: QuizResult;
    
    if (passed)
      result = new QuizResult(passed, this.quiz.msgSuccess, this.score);
    else 
      result = new QuizResult(passed, this.quiz.msgFail, this.score);

    this.quizResultService.updateQuizResult(result);
    this.router.navigate(['answer-quiz/result']);
  }

}
