import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { ErrorResponse } from '../models/error-response';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    protected handleError(errorResponse: HttpErrorResponse): Observable<never> {
        return errorResponse.error instanceof ErrorEvent
            ? throwError(ErrorResponse.create(500, 'A network error occured.', errorResponse.error.message))
            : throwError(ErrorResponse.create(errorResponse.status, (errorResponse.error && errorResponse.error.Message) || errorResponse.statusText, errorResponse.error));
    }
}