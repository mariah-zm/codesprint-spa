import { Component, Input, OnInit } from '@angular/core';
import { QuestionType } from 'src/app/core/models/enums/question-type.enum';
import { QuizQuestion } from 'src/app/core/models/quiz-question';
import { QuizResponse } from 'src/app/core/models/quiz-response';

@Component({
  selector: 'app-answer-quiz',
  templateUrl: './answer-quiz.component.html'
})
export class AnswerQuizComponent implements OnInit {
  @Input() quiz!: QuizResponse;
  @Input() correct!: number;
  @Input() score!: number;
  progress!: number;
  currentQuestion!: QuizQuestion;

  currentQues = 1;
  
  constructor() {
    // To retrieve quiz data and answers from BE using id sent from redirect
    this.quiz = new QuizResponse();
    this.currentQuestion = this.quiz.questions[0];
    this.progress = (this.currentQues-1) / this.quiz.questions.length * 100;
  }

  ngOnInit(): void {

  }

  onNext(): void {
    // To check if answer is correct
    this.currentQues++;
    this.currentQuestion = this.quiz.questions[this.currentQues - 1];
    this.progress = (this.currentQues-1) / this.quiz.questions.length * 100;
  }

  onFinish(): void {
    // Redirect to results
    // this.router
  }

}
