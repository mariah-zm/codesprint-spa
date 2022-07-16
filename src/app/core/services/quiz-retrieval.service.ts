import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { QuizResponse } from "../models/quiz-response";
import { BaseService } from "./base.service";
import { v4 as uuidv4 } from 'uuid';

type NewType = BehaviorSubject<QuizResponse>;

@Injectable({
    providedIn: 'root'
})
export class QuizRetrievalService extends BaseService {
    private quizSubject: NewType = new BehaviorSubject<QuizResponse>(new QuizResponse);
    quiz: Observable<QuizResponse> = this.quizSubject.asObservable();

    constructor(
        private httpClient: HttpClient
    ) {
        super();
    }


    getQuiz(slug: string): Observable<QuizResponse> {
        return this.httpClient.get<QuizResponse>(`${environment.inquizitApiUrl}/quiz/${slug}`,
            { withCredentials: true, headers: { correlation_id: uuidv4() } })
            .pipe(
                tap((quiz: QuizResponse) => {
                    console.log(quiz)
                    this.quizSubject.next(quiz);
                }),
                catchError(this.handleError)
            );
    }

}

