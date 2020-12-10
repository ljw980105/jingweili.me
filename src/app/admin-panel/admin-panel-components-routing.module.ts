import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NavigatorComponent} from './navigator/navigator.component';
import {EditAppsComponent} from './edit-apps/edit-apps.component';
import {FileBrowserComponent} from './file-browser/file-browser.component';
import {EditProjectsComponent} from './edit-projects/edit-projects.component';
import {EditHomeComponent} from './edit-home/edit-home.component';
import {EditGraphicsComponent} from './edit-graphics/edit-graphics.component';
import {EditResumeComponent} from './edit-resume/edit-resume.component';

const routes: Routes = [
    {
        path: '',
        component: NavigatorComponent,
        children: [
            {path: 'edit-apps', component: EditAppsComponent},
            {path: 'browse-files', component: FileBrowserComponent},
            {path: 'edit-projects', component: EditProjectsComponent},
            {path: 'edit-home', component: EditHomeComponent},
            {path: 'edit-graphics', component: EditGraphicsComponent},
            {path: 'edit-resume', component: EditResumeComponent}
        ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelComponentsRoutingModule { }
