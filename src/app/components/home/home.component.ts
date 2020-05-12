import {Component, OnInit} from '@angular/core';
import {ScrollToConfigOptions, ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {Subject} from 'rxjs';
import {delay, filter} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    adcAppDownloadLink = 'https://apps.apple.com/us/app/automatic-door-control/id1500529300';
    adcWebsite = 'https://rpiadc.com';
    scrollToSubject: Subject<[boolean, string]> = new Subject();

    showPCSetup = false;
    showAboutPage = false;
    showContacts = false;

    constructor(
        private scrollToService: ScrollToService,
        private router: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.scrollToSubject
            .pipe(filter(([scroll, id]) => scroll))
            .pipe(delay(50)) // need to delay to make sure components are added to DOM
            .subscribe(([scroll, id]) => this.scrollTo(id));

        this.router.queryParams
            .pipe(filter(params => params.scrollToId === 'contacts'))
            .subscribe(() => this.toggleContactsPage());

        this.router.queryParams
            .pipe(filter(params => params.scrollToId === 'about'))
            .subscribe(() => this.toggleAboutPage());
    }

    togglePCSetup() {
        this.showPCSetup = !this.showPCSetup;
        this.showAboutPage = this.showContacts = false;
        this.scrollToSubject.next([this.showPCSetup, 'pc-setup']);
    }

    toggleAboutPage() {
        this.showAboutPage = !this.showAboutPage;
        this.showPCSetup = this.showContacts = false;
        this.scrollToSubject.next([this.showAboutPage, 'about']);
    }

    toggleContactsPage() {
        this.showContacts = !this.showContacts;
        this.showAboutPage = this.showPCSetup = false;
        this.scrollToSubject.next([this.showContacts, 'contacts']);
    }

    scrollTo(id: string) {
        const config: ScrollToConfigOptions = {
            target: id
        };
        this.scrollToService.scrollTo(config);
    }

}
