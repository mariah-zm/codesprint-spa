import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Quiz } from 'src/app/core/models/quiz';

@Component({
  selector: 'app-quiz-info',
  templateUrl: './quiz-info.component.html'
})
export class QuizInfoComponent implements OnInit {
  quizInfoForm!: FormGroup;
  formErrors: string[] = [];
  infoFormSubmitted: boolean = false;

  quizInfo!: Quiz;

  get f() { return this.quizInfoForm.controls; }

  constructor(private formBuilder: FormBuilder) { 
    this.quizInfoForm = this.formBuilder.group({
      quizName: ['', [Validators.required]],
      quizSlug: ['', [Validators.required]],
      quizDescription: ['', [Validators.maxLength(2)]],
      quizPassingScore: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      quizShowCorrect: [''],
      quizMsgS: ['', [Validators.required]],
      quizMsgF: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    
  }

  onSave() {
    this.formErrors = [];
    this.infoFormSubmitted = true;

    if (this.quizInfoForm.invalid) {
      return;
    }

    this.quizInfo = new Quiz(this.quizInfoForm.value);
    console.log(this.quizInfo);

    // Call backend to save quiz
    // Redirect to quiz created page where a link to view quiz can be clicked

  }

}
