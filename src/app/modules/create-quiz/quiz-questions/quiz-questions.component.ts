
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionType } from 'src/app/core/models/enums/question-type.enum';
import { QuizAnswer } from 'src/app/core/models/quiz-answer';
import { QuizQuestion } from 'src/app/core/models/quiz-question';
import { QuizCreationService } from 'src/app/core/services/quiz-creation.service';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html'
})
export class QuizQuestionsComponent implements OnInit {
  quesForm!: FormGroup;
  answersForm = new FormGroup({})

  answersError!: string;
  question!: QuizQuestion;
  correctAnswers: number[] = [];

  hasErrors = false;
  formSubmitted: boolean = false;
  questionType = QuestionType.SingleChoice;
  answers = [
    new QuizAnswer("", 0, false),
    new QuizAnswer("", 0, false)
  ]

  get f() {
    return this.quesForm.controls;
  }

  af(id: string): any {
    return this.answersForm.controls[id];
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private quizService: QuizCreationService
  ) {
    this.quesForm = this.formBuilder.group({
      question: ['', [Validators.required, Validators.maxLength(250)]]
    });

    this.answersForm.addControl("answer0", new FormControl('', Validators.required));
    this.answersForm.addControl("score0", new FormControl('0', Validators.required));
    this.answersForm.addControl("answer1", new FormControl('', Validators.required));
    this.answersForm.addControl("score1", new FormControl('0', Validators.required));
  }

  ngOnInit(): void {
  }

  onChangeType(type: QuestionType): void {
    // reset answers and form controls
    this.answersForm = new FormGroup({})
    this.correctAnswers = [];

    if (type != QuestionType.TrueFalse) {
      this.answers = [
        new QuizAnswer("", 0, false),
        new QuizAnswer("", 0, false)
      ]

      this.answersForm.addControl("answer0", new FormControl('', Validators.required));
      this.answersForm.addControl("score0", new FormControl('0', Validators.required));
      this.answersForm.addControl("answer1", new FormControl('', Validators.required));
      this.answersForm.addControl("score1", new FormControl('0', Validators.required));
    } else {
      this.answersForm.addControl("score", new FormControl('0', Validators.required));
    }

    this.questionType = type;
  }

  onChangeCorrect(idx: number): void {
    this.correctAnswers[0] = idx;
  }

  onChangeCorrectMultiple(idx: number): void {
    if (this.correctAnswers.includes(idx))
      this.correctAnswers = this.correctAnswers.filter(function (value, index, arr) {
        return value != idx;
      });
    else
      this.correctAnswers.push(idx);
  }

  onAddAnswer(): void {
    const nextIdx = this.answers.length;

    this.answers[nextIdx] = new QuizAnswer("", 0, false);

    this.answersForm.addControl("answer" + nextIdx, new FormControl('', Validators.required));
    this.answersForm.addControl("score" + nextIdx, new FormControl('0', Validators.required));
  }

  onRemoveAnswer(): void {
    this.answers.pop();
  }

  onSave(): void {
    this.formSubmitted = true;

    // Validate question form 
    if (this.quesForm.invalid || this.answersForm.invalid)
      return;

    // Get answers from form 
    this.getAnswersFromForm();

    // Custom Validators
    this.validateAnswers();

    if (this.hasErrors)
      return;

    // Create question with inputs from form
    this.question = new QuizQuestion(this.quesForm.controls['question'].value, this.questionType, this.answers);
    const quiz = this.quizService.getQuiz();
    quiz.questions.push(this.question);

    // Redirect to breakdown screen
    this.quizService.updateQuiz(quiz);
    this.router.navigate(['create-quiz/breakdown']);

    // Call backend to save quiz
    // Redirect to quiz created page where a link to view quiz can be clicked
  }

  private getAnswersFromForm(): void {
    if (this.questionType == QuestionType.TrueFalse) {
      this.answers[0].answer = "True";
      this.answers[1].answer = "False";

      if (this.correctAnswers.length !== 0) {
        this.answers[this.correctAnswers[0]].correct = true;
        this.answers[this.correctAnswers[0]].score = this.answersForm.controls["score"].value;
      }

    } else {
      const keys: string[] = Object.keys(this.answersForm.controls);

      let aIdx = 0;

      for (let idx = 0; idx < keys.length; idx += 2) {
        const aKey = keys[idx];
        const sKey = keys[idx + 1];
        this.answers[aIdx].answer = this.answersForm.controls[aKey].value;
        this.answers[aIdx].score = this.answersForm.controls[sKey].value;

        if (this.correctAnswers.includes(aIdx))
          this.answers[aIdx].correct = true;
        else
          this.answers[aIdx].correct = false;
        
        aIdx++;
      }
    }
  }

  private validateAnswers(): void {
    let hasCorrectAnswer = false;
    this.hasErrors = false;

    this.answers.forEach(ans => {
      if (ans.correct && ans.score == 0) {
        this.answersError = "Correct answers must have a score.";
        this.hasErrors = true;
        return;
      }

      hasCorrectAnswer = hasCorrectAnswer || ans.correct;
    });

    if (this.hasErrors)
      return;

    if (!hasCorrectAnswer) {
      this.answersError = "Please select a correct answer.";
      this.hasErrors = true;
      return;
    }
  }

}
