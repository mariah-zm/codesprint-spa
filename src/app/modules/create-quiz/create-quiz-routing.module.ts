import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BreakdownComponent } from "./breakdown/breakdown.component";
import { QuizInfoComponent } from "./quiz-info/quiz-info.component";
import { QuizQuestionsComponent } from "./quiz-questions/quiz-questions.component";

const CreateQuizRoutes: Routes = [
    { path: 'info', component: QuizInfoComponent },
    { path: 'new-question', component: QuizQuestionsComponent },
    { path: 'breakdown', component: BreakdownComponent },
    { path: '', redirectTo: '/create-quiz/info'}
];

@NgModule({
    imports: [RouterModule.forChild(CreateQuizRoutes)],
    exports: [RouterModule]
})
export class CreateQuizRoutingModule {}