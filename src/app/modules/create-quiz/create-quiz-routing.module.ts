import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CreateQuizComponent } from "./create-quiz.component";


@NgModule({
    imports: [RouterModule.forChild([{path: '', component: CreateQuizComponent}])]
})
export class CreateQuizRoutingModule {}