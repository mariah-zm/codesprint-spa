import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Quiz } from "../models/quiz";
import { v4 as uuidv4 } from 'uuid';
import { BaseService } from "./base.service";
import { AuthenticationService } from "./authentication.service";

@Injectable({
    providedIn: 'root'
})
export class QuizCreationService extends BaseService {
    private initResult = new Quiz();
    private quizSubject: BehaviorSubject<Quiz> = new BehaviorSubject<Quiz>(this.initResult);
    quiz: Observable<Quiz> = this.quizSubject.asObservable();

    constructor(
        private httpClient: HttpClient,
        private authService: AuthenticationService
    ) {
        super();
    }

    updateQuiz(quiz: Quiz): void {
        this.quizSubject.next(quiz);
    }

    getQuiz(): Quiz {
        return this.quizSubject.getValue();
    }

    submitQuiz(): Observable<void> {
        const quiz = this.getQuiz()
        const id = this.authService.getEmail();

        return this.httpClient
            .post<void>(`${environment.inquizitApiUrl}/quiz/new/${id}`, { info: quiz.info, questions: quiz.questions },
                { withCredentials: true, headers: { correlation_id: uuidv4() }, responseType: 'text' as 'json' })
            .pipe(
                catchError(this.handleError)
            );
    }
}  