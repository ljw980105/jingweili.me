import {Component, OnInit} from '@angular/core';
import {ScrollToConfigOptions, ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {Subject} from 'rxjs';
import {delay, filter, take, takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MemoryManagerComponent} from '../../shared/memory-manager/memory-manager.component';
import {GoogleAnalyticsService} from 'ngx-google-analytics';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends MemoryManagerComponent implements OnInit {
    adcAppDownloadLink = 'https://apps.apple.com/us/app/automatic-door-control/id1500529300';
    adcWebsite = 'https://rpiadc.com';
    scrollToSubject: Subject<[boolean, string]> = new Subject();

    showPCSetup = false;
    showAboutPage = false;
    showContacts = false;

    constructor(
        private scrollToService: ScrollToService,
        private router: ActivatedRoute,
        private titleService: Title,
        private route: Router,
        private gaService: GoogleAnalyticsService
    ) {
        super();
        titleService.setTitle('Hi, I\'m Jing');
    }

    ngOnInit(): void {
        this.scrollToSubject
            .pipe(filter(([scroll, id]) => scroll))
            .pipe(delay(50)) // need to delay to make sure components are added to DOM
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(([scroll, id]) => this.scrollTo(id));

        this.router.queryParams
            .pipe(filter(params => params.scrollToId === 'contacts'))
            .pipe(take(1))
            .subscribe(() => this.toggleContactsPage());

        this.router.queryParams
            .pipe(filter(params => params.scrollToId === 'about'))
            .pipe(take(1))
            .subscribe(() => this.toggleAboutPage());

        this.gaService.pageView('/home');
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

    navigateTo(url: string) {
        this.route.navigateByUrl(url);
    }

}
