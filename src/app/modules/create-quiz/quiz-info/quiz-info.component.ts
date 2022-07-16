import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/core/models/quiz';
import { QuizInfo } from 'src/app/core/models/quiz-info';
import { QuizCreationService } from 'src/app/core/services/quiz-creation.service';

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html'
})
export class QuizInfoComponent implements OnInit {
  quizInfoForm!: FormGroup;
  infoFormSubmitted: boolean = false;

  quizInfo!: QuizInfo;

  get f() { return this.quizInfoForm.controls; }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private quizService: QuizCreationService
  ) {
    this.quizInfoForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      slug: ['', [Validators.required, Validators.pattern("^[a-z]*$"), Validators.maxLength(20)]],
      description: ['', [Validators.maxLength(250)]],
      passingScore: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      showCorrect: [''],
      msgSuccess: ['', [Validators.required, Validators.maxLength(100)]],
      msgFailure: ['', [Validators.required, Validators.maxLength(100)]]
    });
  }

  ngOnInit(): void {

  }

  onSave() {
    this.infoFormSubmitted = true;

    if (this.quizInfoForm.invalid) {
      return;
    }

    const quiz = new Quiz();
    this.quizInfo = new QuizInfo(this.quizInfoForm.value);
    quiz.info = this.quizInfo;
    
    // Redirect to breakdown screen
    this.quizService.updateQuiz(quiz);
    this.router.navigate(['create-quiz/breakdown']);

    // Call backend to save quiz
    // Redirect to quiz created page where a link to view quiz can be clicked

  }

}
