import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PcSetupComponent} from './minor-components/pc-setup/pc-setup.component';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import {AboutComponent} from './minor-components/about/about.component';
import {ContactsComponent} from './minor-components/contacts/contacts.component';
import {AppsComponent} from './components/apps/apps.component';
import {DualAppComponent} from './minor-components/dual-app/dual-app.component';
import {HttpClientModule} from '@angular/common/http';
import {BeatslyticsComponent} from './components/beatslytics/beatslytics.component';
import {ResumeComponent} from './components/resume/resume.component';
import {InViewportModule} from 'ng-in-viewport';
import {LottieModule} from 'ngx-lottie';
import { GraphicDesignComponent } from './components/graphic-design/graphic-design.component';
import { LoginComponent } from './minor-components/login/login.component';
import {FormsModule} from '@angular/forms';
import { TimelineBlockComponent } from './minor-components/timeline-block/timeline-block.component';
import { ProjectsComponent } from './components/projects/projects.component';
import {SharedModule} from './shared/shared.module';

export function playerFactory() {
    return import('lottie-web');
}

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent,
        HomeComponent,
        PcSetupComponent,
        AboutComponent,
        ContactsComponent,
        AppsComponent,
        DualAppComponent,
        BeatslyticsComponent,
        ResumeComponent,
        GraphicDesignComponent,
        LoginComponent,
        TimelineBlockComponent,
        ProjectsComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ScrollToModule.forRoot(),
        InViewportModule,
        LottieModule.forRoot({player: playerFactory}),
        FormsModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
