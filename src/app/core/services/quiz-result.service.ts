import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { QuizResult } from "../models/quiz-result";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class QuizResultService extends BaseService {
    private initResult = new QuizResult(false, "this.quiz.msgSuccess", 0);
    private quizResultSubject: BehaviorSubject<QuizResult> = new BehaviorSubject<QuizResult>(this.initResult);
    quizResult: Observable<QuizResult> = this.quizResultSubject.asObservable();

    constructor() {
        super();
    }

    updateQuizResult(quizResult: QuizResult): void {
        this.quizResultSubject.next(quizResult);
    }
    
}  