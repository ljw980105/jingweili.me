import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    @Input() showTopBorder: boolean;

    year: string;
    topBorderStyle: string;

    constructor(private router: Router) {
        this.year = `${(new Date()).getFullYear()}`;
    }

    ngOnInit(): void {
        this.topBorderStyle = this.showTopBorder ? '1px solid #888888' : 'none';
    }

    navigateToHome() {
        this.router.navigateByUrl('/');
    }

}
