import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html'
})
export class RoleComponent implements OnDestroy {
  isLoading = false;
  name!: string;

  private authSubscription!: Subscription;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.name = authService.getName();
   }

  onSelect(role: number) {
    this.isLoading = true;
    this.authSubscription = this.authService.updateRole(role)
      .subscribe(_ =>
        this.router.navigate([''])
          .then(() => {
            window.location.reload();
          }));
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

}
