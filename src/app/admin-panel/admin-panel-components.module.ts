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
        EditProjectsComponent
    ],
    imports: [
        CommonModule,
        AdminPanelComponentsRoutingModule,
        FormsModule,
        HighlightModule,
        LottieModule.forRoot({player: playerFactory})
    ],
    providers: [
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                languages: getHighlightLanguages()
            }
        }
    ]
})
export class AdminPanelComponentsModule {
}
