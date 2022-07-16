import { DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { makeStateKey, TransferState } from "@angular/platform-browser";
import { BehaviorSubject, catchError, Observable, of, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ExternalProvider } from "../models/enums/auth-provider.enum";
import { BaseService } from "./base.service";
import { v4 as uuidv4 } from 'uuid';
import { RoleType } from "../models/enums/role.enum";
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  private isUserAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUserAuthenticated: Observable<boolean> = this.isUserAuthenticatedSubject.asObservable();

  private userSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User);
  user: Observable<User> = this.userSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private httpClient: HttpClient,
    private transferState: TransferState) {
    super();
  }

  logout(): Observable<void> {
    return this.httpClient.post<void>(`${environment.inquizitApiUrl}/auth/logout`, {},
      { withCredentials: true, headers: { correlation_id: uuidv4() } })
      .pipe(
        tap(_ => this.isUserAuthenticatedSubject.next(false)),
        catchError(this.handleError)
      );
  }

  externalLogin(externalProvider: ExternalProvider): void {
    switch (externalProvider) {
      case ExternalProvider.Facebook:
        this.document.location.href = `${environment.inquizitApiUrl}/auth/login-facebook`;
        break;
      case ExternalProvider.Google:
        this.document.location.href = `${environment.inquizitApiUrl}/auth/login-google`;
        break;
    }
  }

  getUserAuthenticationStatus(): Observable<boolean> {
    const transferKey = makeStateKey('authStatus');
    const transferItem = this.transferState.get<boolean>(transferKey, <any>null);

    if (transferItem === null) {
      return this.httpClient.get<boolean>(`${environment.inquizitApiUrl}/auth/is-authenticated`,
        { withCredentials: true, headers: { correlation_id: uuidv4() } })
        .pipe(
          tap((isAuthenticated: boolean) => {
            this.transferState.set<boolean>(transferKey, isAuthenticated);
            this.isUserAuthenticatedSubject.next(isAuthenticated);
          }),
          catchError(this.handleError)
        );
    } else {
      this.isUserAuthenticatedSubject.next(transferItem);
      return of(transferItem);
    }
  }

  getUser(): Observable<User> {
    return this.httpClient.get<User>(`${environment.inquizitApiUrl}/user`,
      { withCredentials: true, headers: { correlation_id: uuidv4() } })
      .pipe(
        tap((user: User) => {
          this.userSubject.next(user)
        }),
        catchError(this.handleError)
      );
  }

  updateUserAuthenticationStatus(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.inquizitApiUrl}/auth/is-authenticated`,
      { withCredentials: true, headers: { correlation_id: uuidv4() } })
      .pipe(
        tap((isAuthenticated: boolean) => this.isUserAuthenticatedSubject.next(isAuthenticated)),
        catchError(this.handleError)
      );
  }
}