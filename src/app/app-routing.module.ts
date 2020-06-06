import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AppsComponent} from './components/apps/apps.component';
import {BeatslyticsComponent} from './components/beatslytics/beatslytics.component';
import {ResumeComponent} from './components/resume/resume.component';
import {GraphicDesignComponent} from './components/graphic-design/graphic-design.component';
import {LoginComponent} from './minor-components/login/login.component';
import {AuthGuardService} from './services/auth-guard.service';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'apps', component: AppsComponent},
    {path: 'beatslytics', component: BeatslyticsComponent},
    {path: 'resume', component: ResumeComponent},
    {path: 'graphic-design', component: GraphicDesignComponent},
    {path: 'login', component: LoginComponent},
    {
        path: 'admin',
        loadChildren: () => import('./admin-panel/admin-panel-components.module').then(m => m.AdminPanelComponentsModule),
        canActivate: [AuthGuardService]
    },
    { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
