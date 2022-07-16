import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap, catchError } from "rxjs";
import { environment } from "src/environments/environment";
import { QuizResponse } from "../models/quiz-response";
import { BaseService } from "./base.service";
import { v4 as uuidv4 } from 'uuid';
import { QuizInfoResponse } from "../models/quiz-info-response";

type NewType = BehaviorSubject<QuizResponse>;

@Injectable({
    providedIn: 'root'
})
export class QuizRetrievalService extends BaseService {
    private quizListSubject: BehaviorSubject<QuizInfoResponse[]> = new BehaviorSubject<QuizInfoResponse[]>([new QuizInfoResponse]);
    quizList: Observable<QuizInfoResponse[]> = this.quizListSubject.asObservable();

    private quizSubject: BehaviorSubject<QuizResponse> = new BehaviorSubject<QuizResponse>(new QuizResponse);
    quiz: Observable<QuizResponse> = this.quizSubject.asObservable();

    constructor(
        private httpClient: HttpClient
    ) {
        super();
    }

    getQuizzes(): Observable<QuizInfoResponse[]> {
        return this.httpClient.get<QuizInfoResponse[]>(`${environment.inquizitApiUrl}/quiz`,
            { withCredentials: true, headers: { correlation_id: uuidv4() } })
            .pipe(
                tap((list: QuizInfoResponse[]) => {
                    console.log(list)
                    this.quizListSubject.next(list);
                }),
                catchError(this.handleError)
            );
    }

    getQuiz(slug: string): Observable<QuizResponse> {
        return this.httpClient.get<QuizResponse>(`${environment.inquizitApiUrl}/quiz/${slug}`,
            { withCredentials: true, headers: { correlation_id: uuidv4() } })
            .pipe(
                tap((quiz: QuizResponse) => {
                    this.quizSubject.next(quiz);
                }),
                catchError(this.handleError)
            );
    }

}

