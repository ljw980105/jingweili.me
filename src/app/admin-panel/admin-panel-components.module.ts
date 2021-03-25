import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminPanelComponentsRoutingModule} from './admin-panel-components-routing.module';
import {NavigatorComponent} from './navigator/navigator.component';
import {EditResumeComponent} from './edit-resume/edit-resume.component';
import { EditGraphicsComponent } from './edit-graphics/edit-graphics.component';
import {FormsModule} from '@angular/forms';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { EditProjectsComponent } from './edit-projects/edit-projects.component';
import {HighlightModule, HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import {LottieModule} from 'ngx-lottie';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { ActivityIndicatorComponent } from './activity-indicator/activity-indicator.component';
import {AdminHelperService} from './admin-helper.service';
import { BatchFileUploaderComponent } from './batch-file-uploader/batch-file-uploader.component';
import { EditAppsComponent } from './edit-apps/edit-apps.component';
import { FileBrowserComponent } from './file-browser/file-browser.component';
import {NgBytesPipeModule} from 'angular-pipes';
import {SharedModule} from '../shared/shared.module';

export function getHighlightLanguages() {
    return {
       json: () => import('highlight.js/lib/languages/json')
    };
}

export function playerFactory() {
    return import('lottie-web');
}

@NgModule({
    declarations: [
        NavigatorComponent,
        EditResumeComponent,
        EditGraphicsComponent,
        EditHomeComponent,
        EditProjectsComponent,
        ActivityIndicatorComponent,
        BatchFileUploaderComponent,
        EditAppsComponent,
        FileBrowserComponent
    ],
    imports: [
        CommonModule,
        AdminPanelComponentsRoutingModule,
        FormsModule,
        HighlightModule,
        LottieModule.forRoot({player: playerFactory}),
        MatDialogModule,
        NgBytesPipeModule,
        SharedModule
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                languages: getHighlightLanguages()
            }
        },
        {
            provide: MatDialogRef,
            useValue: {}
        },
        {
            provide: MAT_DIALOG_DATA,
            useValue: {}
        },
        AdminHelperService
    ]
})
export class AdminPanelComponentsModule {
}
