import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Quiz } from "../models/quiz";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})
export class QuizCreationService extends BaseService {
    private initResult = new Quiz();
    private quizSubject: BehaviorSubject<Quiz> = new BehaviorSubject<Quiz>(this.initResult);
    quiz: Observable<Quiz> = this.quizSubject.asObservable();

    constructor() {
        super();
    }

    updateQuiz(quiz: Quiz): void {
        this.quizSubject.next(quiz);
    }

    getQuiz(): Quiz {
        return this.quizSubject.getValue();
    }
}  