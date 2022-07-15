import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionType } from 'src/app/core/models/enums/question-type.enum';
import { QuizAnswer } from 'src/app/core/models/quiz-answer';
import { QuizQuestion } from 'src/app/core/models/quiz-question';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html'
})
export class QuizQuestionsComponent implements OnInit {
  quesForm!: FormGroup;
  answersForm!: FormGroup;

  formErrors: string[] = [];
  formSubmitted: boolean = false;

  question!: QuizQuestion;
  questionType = QuestionType.SingleChoice;
  correctAnswer = 1;

  get f() {
    return this.quesForm.controls;
  }

  get answers() {
    return this.answersForm.controls["answers"] as FormArray;
  }

  constructor(private formBuilder: FormBuilder) {
    this.quesForm = this.formBuilder.group({
      question: ['', [Validators.required, Validators.maxLength(250)]]
    });

    this.answersForm = this.formBuilder.group({
      // By default a question must have 2 answers
      answers: this.formBuilder.array([new QuizAnswer(), new QuizAnswer])
    });

  }

  ngOnInit(): void {
  }

  onChangeType(type: QuestionType): void {
    this.questionType = type;
  }

  onAddAnswer(): void {
    const answerForm = this.formBuilder.group({
      answer: ['', Validators.required],
      score: ['', Validators.required]
    });

    this.answers.push(answerForm);
  }

  onSave(): void {
    this.formErrors = [];
    this.formSubmitted = true;

    if (this.quesForm.invalid) {
      return;
    }

    const answers = [new QuizAnswer()];

    this.question = new QuizQuestion(this.quesForm.controls['question'].value, this.questionType, answers, this.correctAnswer);
    console.log(this.question);

    // Call backend to save quiz
    // Redirect to quiz created page where a link to view quiz can be clicked
  }

}
