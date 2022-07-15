import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuizQuestion } from 'src/app/core/models/quiz-question';
import * as AOS from 'aos';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html'
})
export class CreateQuizComponent implements OnInit {
  quizForm!: FormGroup; 
  formErrors: string[] = [];
  formSubmitted: boolean = false;
  isLoading: boolean = false;

  quizQuestions = [new QuizQuestion()];
  quizName!: string;
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router) 
  {
  }

  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      quizName: ['', [Validators.required]],
      question: ['', [Validators.required]],
      answer: ['', [Validators.required]]
    });

    AOS.init({
      duration: 1200,
      easing: 'ease',
      once: true,
      mirror: false,
      anchorPlacement: 'top-bottom'
    });
  }

  addQuestion(): void {
    this.quizQuestions.push(new QuizQuestion());
    console.log(this.quizQuestions);
  }

  addAnswer(qIdx: number): void {
    this.quizQuestions[qIdx].answers.push("");
  }

  onSubmit(): void {
    this.formErrors = [];
    this.formSubmitted = true;

    if (this.quizForm.invalid) {
      return;
    }

    this.isLoading = true;

    // Call backend to save quiz
    // Redirect to quiz created page where a link to view quiz can be clicked

    this.isLoading = false;
  }

}
