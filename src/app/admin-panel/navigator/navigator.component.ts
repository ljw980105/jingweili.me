import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../services/api.service';
import {AnimationOptions} from 'ngx-lottie';

@Component({
    selector: 'app-navigator',
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit, OnDestroy {
    showAnimatedHint = true;
    highlights = [false, false, false, false, false, false];

    constructor(private titleService: Title, private apiService: ApiService) {
        this.titleService.setTitle('Admin Panel');
    }

    options: AnimationOptions = {
        path: 'assets/animations/left-loop.json'
    };

    ngOnInit(): void {
    }

    ngOnDestroy() {
        this.logOut();
    }

    logOut() {
        this.apiService.logOut()
            .subscribe(() => {});
    }

    routerActivated() {
        this.showAnimatedHint = false;
    }

    routerDeactivated() {
        this.showAnimatedHint = true;
    }

    highlightHyperlinkWithIndex(index: number) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.highlights.length; i ++) {
            this.highlights[i] = i === index;
        }

    }

}
