import {Component, OnInit} from '@angular/core';
import {addAnimation, popupAnimation} from '../../models/Animations';
import {ScrollToConfigOptions, ScrollToService} from '@nicky-lenaers/ngx-scroll-to';
import {Subject} from 'rxjs';
import {delay, filter} from 'rxjs/operators';

@Component({
    selector: 'app-home',
    animations: [popupAnimation],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    adcAppDownloadLink = 'https://apps.apple.com/us/app/automatic-door-control/id1500529300';
    adcWebsite = 'https://rpiadc.com';
    scrollToSubject: Subject<[boolean, string]> = new Subject();

    showPCSetup = false;
    showAboutPage = false;

    constructor(private scrollToService: ScrollToService) {
    }

    ngOnInit(): void {
        this.scrollToSubject
            .pipe(filter(([scroll, id]) => scroll))
            .pipe(delay(50)) // need to delay to make sure components are added to DOM
            .subscribe(([scroll, id]) => this.scrollTo(id));
    }

    togglePCSetup() {
        this.showPCSetup = !this.showPCSetup;
        this.showAboutPage= false;
        this.scrollToSubject.next([this.showPCSetup, 'pc-setup']);
    }

    toggleAboutPage() {
        this.showAboutPage = !this.showAboutPage;
        this.showPCSetup = false;
        this.scrollToSubject.next([this.showAboutPage, 'about']);
    }

    scrollTo(id: string) {
        const config: ScrollToConfigOptions = {
            target: id
        };
        this.scrollToService.scrollTo(config);
    }

}
