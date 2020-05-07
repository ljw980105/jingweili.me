import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    adcAppDownloadLink = 'https://apps.apple.com/us/app/automatic-door-control/id1500529300';
    adcWebsite = 'https://rpiadc.com';

    constructor() {
    }

    ngOnInit(): void {
    }

}
