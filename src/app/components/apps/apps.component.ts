import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../services/api.service';
import {AppOrSkill} from '../../models/pure-models/AppOrSkill';
import {sliceIntoTuplesOfTwoFrom} from '../../models/Global';
import {Experience} from '../../models/pure-models/Experience';
import {forkJoin} from 'rxjs';
import {take} from 'rxjs/operators';
import {GoogleAnalyticsService} from 'ngx-google-analytics';

@Component({
    selector: 'app-apps',
    templateUrl: './apps.component.html',
    styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {
    apps: [AppOrSkill, AppOrSkill][];
    skills: [AppOrSkill, AppOrSkill][];
    experiences: Experience[];

    constructor(
        private titleService: Title,
        public apiService: ApiService,
        private gaService: GoogleAnalyticsService
    ) {
        this.titleService.setTitle('Apps');
    }

    ngOnInit(): void {
        forkJoin([
            this.apiService.getAppsPageData(),
            this.apiService.getExperiencesData()
        ])
            .pipe(take(1))
            .subscribe(([result, experiences]) => {
                const temp = result.apps;
                const temp2 = result.skills;
                if (temp.length % 2 === 1) {
                    temp.push(null);
                }
                if (temp2.length % 2 === 1) {
                    temp2.push(null);
                }
                this.apps = sliceIntoTuplesOfTwoFrom(temp);
                this.skills = sliceIntoTuplesOfTwoFrom(temp2);
                this.experiences = experiences.filter(exp => exp.special === 'for apps');
            });

        this.gaService.pageView('/apps');
    }

}
