import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPanelComponentsRoutingModule} from './admin-panel-components-routing.module';
import {NavigatorComponent} from './navigator/navigator.component';
import {EditResumeComponent} from './edit-resume/edit-resume.component';
import {FileUploadModule} from 'ng2-file-upload';

@NgModule({
    declarations: [
        NavigatorComponent,
        EditResumeComponent
    ],
    imports: [
        CommonModule,
        AdminPanelComponentsRoutingModule,
        FileUploadModule
    ]
})
export class AdminPanelComponentsModule {
}
