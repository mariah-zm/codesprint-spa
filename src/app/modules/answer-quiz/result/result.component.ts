import { Component, OnInit } from '@angular/core';
import { QuizResult } from 'src/app/core/models/quiz-result';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html'
})
export class ResultComponent implements OnInit {
  result!: QuizResult;

  constructor() {
    this.result = new QuizResult();
  }

  ngOnInit(): void {
  }

}
