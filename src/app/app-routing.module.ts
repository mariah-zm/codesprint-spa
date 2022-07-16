import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./modules/home/home.module').then(h => h.HomeModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/login/login.module').then(l => l.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./modules/register/register.module').then(r => r.RegisterModule)
    },
    {
        path: 'create-quiz',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/create-quiz/create-quiz.module').then(c => c.CreateQuizModule)
    },
    {
        path: 'explore',
        loadChildren: () => import('./modules/explore/explore.module').then(e => e.ExploreModule)
    },

    {
        path: 'answer-quiz',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/answer-quiz/answer-quiz.module').then(e => e.AnswerQuizModule)
    },
    {
        path: 'not-found',
        loadChildren: () => import('./modules/not-found/not-found.module').then(e => e.NotFoundModule)
    },
    {
        path: '**',
        redirectTo: '/not-found'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }