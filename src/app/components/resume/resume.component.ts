import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ResumeData, WebSkill} from '../../models/ResumeData';
import {Title} from '@angular/platform-browser';
import {forkJoin, of, Subject} from 'rxjs';
import {Experience} from '../../models/Experience';
import {delay, elementAt, mergeMap} from 'rxjs/operators';
import {AnimationOptions} from 'ngx-lottie';
import {fadeOut} from '../../models/Animations';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    animations: [fadeOut],
    styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
    data: ResumeData;
    webSkillsFormatted: WebSkill[] = [];
    experiences: Experience[];
    resumeInVP = new Subject<Event>();
    showResumeTutorial = true;

    options: AnimationOptions = {
        path: 'assets/animations/swipe-hint-animation.json',
    };

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

        this.resumeInVP
            .pipe(elementAt(1))
            .pipe(mergeMap((e) => {
                this.showResumeTutorial = true;
                return of(e);
            }))
            .pipe(delay(2000))
            .subscribe(() => this.showResumeTutorial = false);
    }

    resumeInViewport(event: Event) {
        this.resumeInVP.next(event);
    }

}
