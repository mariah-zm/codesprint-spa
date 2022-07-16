import { Observable, of, tap } from "rxjs";
import { catchError } from "rxjs/operators";
import { RoleType } from "./models/enums/role.enum";
import { User } from "./models/user";
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

export function getUser(authService: AuthenticationService): () => Observable<User> {
    return () => {
        return authService
            .getUser()
            .pipe(
                catchError(_ => of(new User))
            );
    };
}