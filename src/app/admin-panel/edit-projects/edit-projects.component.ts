import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {multipleFilesFromEvent} from '../../models/Global';
import {Project} from '../../models/pure-models/Project';
import {AdminHelperService} from '../admin-helper.service';

@Component({
    selector: 'app-edit-projects',
    templateUrl: './edit-projects.component.html',
    styleUrls: ['./edit-projects.component.scss']
})
export class EditProjectsComponent implements OnInit {
    jsonSpec = `
    [
        {
            imageURL: string,
            name: string,
            description: string,
            links: [
                {
                    name: string,
                    url: string
                },
                ...
            ],
            technologies: [ "tech-1", "tech-2", ...]
        },
        ...
    ]
    `;
    projectsData: string;
    projects: Project[];

    constructor(public apiService: ApiService, private helperService: AdminHelperService) {
    }

    ngOnInit(): void {
        this.apiService.getProjects()
            .subscribe(projects => {
                this.projects = projects;
            });
    }

    uploadFiles(event: any) {
        const files = multipleFilesFromEvent(event);
        this.helperService.showActivityIndicatorWithObservable(this.apiService.uploadMultipleFiles(files));
    }

    uploadProjects() {
        this.helperService.showActivityIndicatorWithObservable(this.apiService.addProjects(this.projectsData));
    }

    exportJSON() {
        this.helperService.exportASJSONWithData(this.projects, 'projects.json');
    }

}
