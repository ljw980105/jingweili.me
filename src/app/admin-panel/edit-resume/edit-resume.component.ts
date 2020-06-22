import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {forkJoin, Observable} from 'rxjs';
import {AdminHelperService} from '../admin-helper.service';
import {Experience} from '../../models/pure-models/Experience';

@Component({
    selector: 'app-edit-resume',
    templateUrl: './edit-resume.component.html',
    styleUrls: ['./edit-resume.component.scss']
})
export class EditResumeComponent implements OnInit {
    resumeExists = false;
    cvExists = false;
    experienceString = '';
    experiences: Observable<Experience[]>;
    jsonSpec = `
        [
            {
                imageLink: string;
                position: string;
                time: string;
                company: string;
                accomplishments: string[];
                special: string;
            },
            ...
        ]
    `;

    constructor(public apiService: ApiService, private helperService: AdminHelperService) {
    }

    ngOnInit(): void {
        this.experiences = this.apiService.getExperiencesData();
        forkJoin([this.apiService.getResume(), this.apiService.getCV()])
            .subscribe(([resume, cv]) => {
                this.resumeExists = resume.exists;
                this.cvExists = cv.exists;
            });
    }

    uploadResume(event: any) {
        const files = event.target.files as FileList;
        this.helperService.showActivityIndicatorWithObservable(
            this.apiService.uploadResume(files.item(0))
        );
    }

    uploadCV(event: any) {
        const files = event.target.files as FileList;
        this.helperService.showActivityIndicatorWithObservable(
            this.apiService.uploadCV(files.item(0))
        );
    }

    uploadExperiences() {
        this.helperService.showActivityIndicatorWithObservable(
            this.apiService.addExperiences(this.experienceString),
            () => this.experiences = this.apiService.getExperiencesData()
        );
    }

}
