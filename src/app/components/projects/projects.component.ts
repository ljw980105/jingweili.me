import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/pure-models/Project';
import {ApiService} from '../../services/api.service';
import {take} from 'rxjs/operators';
import {GoogleAnalyticsService} from 'ngx-google-analytics';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    dataReady = false;
    projectsFirstColumn: Project[] = [];
    projectsSecondColumn: Project[] = [];

    constructor(
        public apiService: ApiService,
        private gaService: GoogleAnalyticsService,
        private titleService: Title
    ) {
        this.titleService.setTitle('Projects');
    }

    ngOnInit(): void {
        this.apiService.getProjects()
            .pipe(take(1))
            .subscribe((projects) => {
                const mid = Math.ceil(projects.length / 2.0);
                this.projectsFirstColumn = projects.slice(0, mid);
                this.projectsSecondColumn = projects.slice(mid, projects.length);
                this.dataReady = true;
            });

        this.gaService.pageView('/projects');
    }
}
