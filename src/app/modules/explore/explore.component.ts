import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { QuizResponse } from 'src/app/core/models/quiz-response';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html'
})
export class ExploreComponent implements OnInit {
  quizzes: QuizResponse[] = [];

  constructor() {
    // To replace this by retrieving quizzes from BE

    const quizResponse = new QuizResponse(
      1,
      "Quiz Title",
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
