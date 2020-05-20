import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AppsComponent} from './components/apps/apps.component';
import {BeatslyticsComponent} from './components/beatslytics/beatslytics.component';
import {ResumeComponent} from './components/resume/resume.component';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'apps', component: AppsComponent},
    {path: 'beatslytics', component: BeatslyticsComponent},
    {path: 'resume', component: ResumeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
