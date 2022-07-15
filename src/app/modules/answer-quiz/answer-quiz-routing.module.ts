import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AnswerQuizComponent } from "./answer-quiz.component";
import { ResultComponent } from "./result/result.component";

const CreateQuizRoutes: Routes = [
    { path: 'result', component: ResultComponent },
    { path: '', component: AnswerQuizComponent },
];

@NgModule({
    imports: [RouterModule.forChild(CreateQuizRoutes)],
    exports: [RouterModule]
})
export class AnswerQuizRoutingModule {}