
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RegisterComponent } from "./register.component";
import { RoleComponent } from "./role/role.component";

const RegisterRoutes: Routes = [
    { path: 'role', component: RoleComponent },
    { path: '', component: RegisterComponent }
];

@NgModule({
    imports: [RouterModule.forChild(RegisterRoutes)]
})
export class RegisterRoutingModule { }