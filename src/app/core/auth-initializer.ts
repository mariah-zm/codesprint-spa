import { Observable, of } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthenticationService } from "./services/authentication.service"

export function checkIfUserIsAuthenticated(authService: AuthenticationService): () => Observable<boolean> {
    return () => {
        return authService
            .getUserAuthenticationStatus()
            .pipe(
                catchError(_ => of(false))
            );
    };
}