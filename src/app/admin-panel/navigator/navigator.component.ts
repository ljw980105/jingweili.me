import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../services/api.service';
import {AnimationOptions} from 'ngx-lottie';
import {last} from 'rxjs/operators';

@Component({
    selector: 'app-navigator',
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit, OnDestroy {
    showAnimatedHint = true;
    highlights: {[key: string]: boolean} = {
        'edit-resume': false,
        'edit-graphics': false,
        'edit-home': false,
        'edit-projects': false,
        'edit-apps': false,
        'browse-files': false
    };

    constructor(private titleService: Title, private apiService: ApiService) {
        this.titleService.setTitle('Admin Panel');
    }

    options: AnimationOptions = {
        path: 'assets/animations/left-loop.json'
    };

    ngOnInit(): void {
        // highlight a navigator link if applicable
        const segments = window.location.href.split('/');
        const lastComponent = segments[segments.length - 1];
        if (lastComponent in this.highlights) {
            this.highlights[lastComponent] = true;
        }
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

    highlightComponent(component: string) {
        Object.keys(this.highlights).forEach(v => this.highlights[v] = false);
        this.highlights[component] = true;
    }

}
