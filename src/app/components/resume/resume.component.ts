import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ResumeData, WebSkill} from '../../models/ResumeData';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
    data: ResumeData;
    webSkillsFormatted: WebSkill[] = [];

    constructor(private apiService: ApiService, private titleService: Title) {
        titleService.setTitle('Resume');
    }

    ngOnInit(): void {
        this.apiService.getResumeData()
            .subscribe(data => {
                this.data = data;
                this.webSkillsFormatted.push(new WebSkill('Frontend', data.webSkillsFrontend));
                this.webSkillsFormatted.push(new WebSkill('Backend', data.webSkillsBackend));
                this.webSkillsFormatted.push(new WebSkill('General', data.webSkillsGeneral));
            });
    }

}
