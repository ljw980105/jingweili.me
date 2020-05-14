import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {HomeComponent} from './components/home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PcSetupComponent } from './minor-components/pc-setup/pc-setup.component';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import { AboutComponent } from './minor-components/about/about.component';
import { ContactsComponent } from './minor-components/contacts/contacts.component';
import { AppsComponent } from './components/apps/apps.component';
import { DualAppComponent } from './minor-components/dual-app/dual-app.component';
import {HttpClientModule} from '@angular/common/http';

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
        DualAppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        ScrollToModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
