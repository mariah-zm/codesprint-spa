import { Observable, of, tap } from "rxjs";
import { catchError } from "rxjs/operators";
import { RoleType } from "./models/enums/role.enum";
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

export function checkUserRole(authService: AuthenticationService): () => Observable<RoleType> {
    return () => {
        return authService
            .getUserRole()
            .pipe(
                catchError(_ => of(RoleType.NONE))
            );
    };
}