import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPanelComponentsRoutingModule} from './admin-panel-components-routing.module';
import {NavigatorComponent} from './navigator/navigator.component';
import {EditResumeComponent} from './edit-resume/edit-resume.component';
import { EditGraphicsComponent } from './edit-graphics/edit-graphics.component';
import {FormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        NavigatorComponent,
        EditResumeComponent,
        EditGraphicsComponent
    ],
    imports: [
        CommonModule,
        AdminPanelComponentsRoutingModule,
        FormsModule
    ]
})
export class AdminPanelComponentsModule {
}
