import {Component, OnInit} from '@angular/core';
import {Project} from '../../models/pure-models/Project';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
    dataReady = false;
    projectsFirstColumn: Project[] = [];
    projectsSecondColumn: Project[] = [];

    constructor(public apiService: ApiService) {
    }

    ngOnInit(): void {
        this.apiService.getProjectsData()
            .subscribe((projects) => {
                const mid = projects.length / 2;
                this.projectsFirstColumn = projects.slice(0, mid);
                this.projectsSecondColumn = projects.slice(mid, projects.length);
                this.dataReady = true;
            });
    }



}
