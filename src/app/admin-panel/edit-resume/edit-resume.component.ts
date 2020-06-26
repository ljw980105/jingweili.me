import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {forkJoin} from 'rxjs';
import {AdminHelperService} from '../admin-helper.service';
import {Experience} from '../../models/pure-models/Experience';
import {ResumeData} from '../../models/pure-models/ResumeData';
import {GenericFeature} from '../../models/pure-models/GenericFeature';
import {TextAndImage} from '../../models/pure-models/TextAndImage';

@Component({
    selector: 'app-edit-resume',
    templateUrl: './edit-resume.component.html',
    styleUrls: ['./edit-resume.component.scss']
})
export class EditResumeComponent implements OnInit {
    resumeExists = false;
    cvExists = false;
    experienceString = '';
    experiences: Experience[];
    remainingResumeDataString = '';
    resumeData: ResumeData;
    experienceJsonSpec = `
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
    remainingJsonSpec = `
        appsWorkedOn: number;
        commercialAppsWorkedOn: number;
        appsPublished: number;
        iosSkills: [
            {
                name: string;
                details: string[];
            }, ...
        ];
        webSkillsFrontend: [
            {
                imageUrl: string;
                text: string;
            }, ...
        ];
        webSkillsBackend: [
            {
                imageUrl: string;
                text: string;
            }, ...
        ];
        webSkillsGeneral: [
            {
                imageUrl: string;
                text: string;
            }, ...
        ];
        graphicSkills: [
            {
                name: string;
                details: string[];
            }, ...
        ];
    `;

    constructor(public apiService: ApiService, private helperService: AdminHelperService) {
    }

    ngOnInit(): void {
        forkJoin([
            this.apiService.getResume(),
            this.apiService.getCV(),
            this.apiService.getExperiencesData(),
            this.apiService.getRemainingResumeData()])
            .subscribe(([resume, cv, exp, resumeData]) => {
                this.resumeExists = resume.exists;
                this.cvExists = cv.exists;
                this.experiences = exp;
                this.resumeData = resumeData;
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
            this.apiService.addExperiences(this.experienceString)
        );
    }

    exportExperiencesAsJSON() {
        this.helperService.exportASJSONWithData(this.experiences, 'experiences.json');
    }

    uploadRemainingResumeData() {
        this.helperService.showActivityIndicatorWithObservable(
            this.apiService.uploadResumeData(this.remainingResumeDataString)
        );
    }

    genericSkillsParsed(skills: GenericFeature[]): string {
        return skills.map(s => s.name).join(', ');
    }

    textAndImagesParsed(skills: TextAndImage[]): string {
        return skills.map(s => s.text).join(', ');
    }

    exportRemainingAsJSON() {
        this.helperService.exportASJSONWithData(this.resumeData, 'resume-data.json');
    }

}
