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

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends BaseService {
  private isUserAuthenticatedSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isUserAuthenticated: Observable<boolean> = this.isUserAuthenticatedSubject.asObservable();

  private userRoleSubject: BehaviorSubject<RoleType> = new BehaviorSubject<RoleType>(RoleType.NONE);
  userRole: Observable<RoleType> = this.userRoleSubject.asObservable();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private httpClient: HttpClient,
    private transferState: TransferState) {
    super();
  }

  logout(): Observable<void> {
    return this.httpClient.post<void>(`${environment.codeSprintApiUrl}/auth/logout`, {},
      { withCredentials: true, headers: { correlation_id: uuidv4() } })
      .pipe(
        tap(_ => this.isUserAuthenticatedSubject.next(false)),
        catchError(this.handleError)
      );
  }

  externalLogin(externalProvider: ExternalProvider): void {
    switch (externalProvider) {
      case ExternalProvider.Facebook:
        this.document.location.href = `${environment.codeSprintApiUrl}/auth/login-facebook`;
        break;
      case ExternalProvider.Google:
        this.document.location.href = `${environment.codeSprintApiUrl}/auth/login-google`;
        break;
    }
  }

  getUserAuthenticationStatus(): Observable<boolean> {
    const transferKey = makeStateKey('authStatus');
    const transferItem = this.transferState.get<boolean>(transferKey, <any>null);

    if (transferItem === null) {
      return this.httpClient.get<boolean>(`${environment.codeSprintApiUrl}/auth/is-authenticated`,
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

  getUserRole(): Observable<RoleType> {
    return this.httpClient.get<RoleType>(`${environment.codeSprintApiUrl}/auth/role`,
    { withCredentials: true, headers: { correlation_id: uuidv4() } })
    .pipe(
      tap((role: RoleType) => this.userRoleSubject.next(role)),
      catchError(this.handleError)
    );
  }

  updateUserAuthenticationStatus(): Observable<boolean> {
    return this.httpClient.get<boolean>(`${environment.codeSprintApiUrl}/auth/is-authenticated`,
      { withCredentials: true, headers: { correlation_id: uuidv4() } })
      .pipe(
        tap((isAuthenticated: boolean) => this.isUserAuthenticatedSubject.next(isAuthenticated)),
        catchError(this.handleError)
      );
  }
}