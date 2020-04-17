import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {shrinkOrExpand} from '../../Animations';
import {fromEvent} from 'rxjs';
import {filter, map, share} from 'rxjs/operators';

@Component({
    selector: 'app-footer',
    animations: [shrinkOrExpand],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
    @Input() showTopBorder: boolean;

    year: string;
    topBorderStyle: string;
    pagesExpanded = true;
    projectsExpanded = true;
    designsExpanded = true;
    socialsExpanded = true;
    minimizedVersionShown = false;

    constructor(private router: Router) {
        this.year = `${(new Date()).getFullYear()}`;
    }

    ngOnInit(): void {
        this.topBorderStyle = this.showTopBorder ? '1px solid #888888' : 'none';

        if (window.innerWidth < 500) {
            this.minimizedVersionShown = true;
            this.expandEverything(false);
        }

        const widthObservable = fromEvent(window, 'resize')
            .pipe(map(() => window.innerWidth))
            .pipe(share());

        widthObservable
            .pipe(filter((w) => w < 500)) // less than cutoff, collapse all menus
            .pipe(filter(() => !this.minimizedVersionShown))
            .subscribe(() => {
                this.minimizedVersionShown = true;
                this.expandEverything(false);
            });

        widthObservable
            .pipe(filter((w) => w > 500)) // more than cutoff, expand everything
            .pipe(filter(() => this.minimizedVersionShown))
            .subscribe(() => {
                this.minimizedVersionShown = false;
                this.expandEverything(true);
            });
    }

    navigateToHome() {
        this.router.navigateByUrl('/');
    }

    toggle(index: number) {
        if (index === 1) {
            this.pagesExpanded = !this.pagesExpanded;
        } else if (index === 2) {
            this.projectsExpanded = !this.projectsExpanded;
        } else if (index === 3) {
            this.designsExpanded = !this.designsExpanded;
        } else if (index === 4) {
            this.socialsExpanded = !this.socialsExpanded;
        }
    }

    expandEverything(expand: boolean) {
        this.pagesExpanded = expand;
        this.projectsExpanded = expand;
        this.designsExpanded = expand;
        this.socialsExpanded = expand;
    }

    plugMinusFromBool(bool: boolean) {
        if (this.minimizedVersionShown) {
            return bool ? '- ' : '+ ';
        }
        return '';
    }
}
