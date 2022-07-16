import { Component, OnInit } from '@angular/core';
import { QuizInfoResponse } from 'src/app/core/models/quiz-info-response';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html'
})
export class ExploreComponent implements OnInit {
  quizzes: QuizInfoResponse[] = [];

  constructor() {
    // To replace this by retrieving quizzes from BE

    const quizResponse = new QuizInfoResponse(
      "Quiz Title",
      "quiz",
      "This is an example of a quiz title in which the teacher can explain what the quiz is about.",
      10
    );

    this.quizzes.push(quizResponse);
    this.quizzes.push(quizResponse);
    this.quizzes.push(quizResponse);
    this.quizzes.push(quizResponse);
    this.quizzes.push(quizResponse);
    this.quizzes.push(quizResponse);
    this.quizzes.push(quizResponse);
    this.quizzes.push(quizResponse);
  }

  ngOnInit(): void {
  }

}
