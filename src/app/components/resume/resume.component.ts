import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ResumeData, WebSkill} from '../../models/ResumeData';
import {Title} from '@angular/platform-browser';
import {forkJoin} from 'rxjs';
import {Experience} from '../../models/Experience';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
    data: ResumeData;
    webSkillsFormatted: WebSkill[] = [];
    experiences: Experience[];

    constructor(private apiService: ApiService, private titleService: Title) {
        titleService.setTitle('Resume');
    }

    ngOnInit(): void {
        forkJoin([
            this.apiService.getResumeData(),
            this.apiService.getExperiencesData()
        ]).subscribe(([data, experiences]) => {
                this.data = data;
                this.webSkillsFormatted.push(new WebSkill('Frontend', data.webSkillsFrontend));
                this.webSkillsFormatted.push(new WebSkill('Backend', data.webSkillsBackend));
                this.webSkillsFormatted.push(new WebSkill('General', data.webSkillsGeneral));
                this.experiences = experiences;
            });
    }

}
