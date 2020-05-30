import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavigatorComponent} from './navigator/navigator.component';
import {EditResumeComponent} from './edit-resume/edit-resume.component';

const routes: Routes = [
    {path: '', component: NavigatorComponent},
    {path: 'edit-resume', component: EditResumeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelComponentsRoutingModule { }
