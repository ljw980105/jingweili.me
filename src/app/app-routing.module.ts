import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AppsComponent} from './components/apps/apps.component';
import {BeatslyticsComponent} from './components/beatslytics/beatslytics.component';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'apps', component: AppsComponent},
    {path: 'beatslytics', component: BeatslyticsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
