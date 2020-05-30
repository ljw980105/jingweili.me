import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AppsComponent} from './components/apps/apps.component';
import {BeatslyticsComponent} from './components/beatslytics/beatslytics.component';
import {ResumeComponent} from './components/resume/resume.component';
import {GraphicDesignComponent} from './components/graphic-design/graphic-design.component';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'apps', component: AppsComponent},
    {path: 'beatslytics', component: BeatslyticsComponent},
    {path: 'resume', component: ResumeComponent},
    {path: 'graphic-design', component: GraphicDesignComponent},
    {
        path: 'admin',
        loadChildren: () => import('./admin-panel/admin-panel-components.module').then(m => m.AdminPanelComponentsModule)
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
