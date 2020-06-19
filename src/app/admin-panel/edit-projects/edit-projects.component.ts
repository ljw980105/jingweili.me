import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {multipleFilesFromEvent} from '../../models/Global';
import {AnimationOptions} from 'ngx-lottie';
import {Project} from '../../models/pure-models/Project';
import {saveAs} from 'file-saver';
import {Observable, of, throwError} from 'rxjs';
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
    uploadingFiles = false;
    uploadingProjects = false;
    projectsData: string;
    projects: Project[];

    uploadFilesOptions: AnimationOptions = {
        path: 'assets/animations/loading.json'
    };

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

    error(): Observable<any> {
        return throwError(Error('Error'));
    }

    uploadProjects() {
        this.uploadingProjects = true;
        this.apiService.addProjects(this.projectsData)
            .subscribe(() =>  this.uploadingProjects = false,
                () => this.uploadingProjects = false);
    }

    exportJSON() {
        const string = JSON.stringify(this.projects);
        const blob = new Blob([string], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, 'projects.json');
    }

}
