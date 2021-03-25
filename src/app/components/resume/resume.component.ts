import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ResumeData, WebSkill} from '../../models/pure-models/ResumeData';
import {Title} from '@angular/platform-browser';
import {Observable, of, Subject} from 'rxjs';
import {Experience} from '../../models/pure-models/Experience';
import {delay, elementAt, mergeMap, take} from 'rxjs/operators';
import {AnimationOptions} from 'ngx-lottie';
import {fadeOut} from '../../models/Animations';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    animations: [fadeOut],
    styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
    data: ResumeData = null;
    webSkillsFormatted: WebSkill[] = [];
    experiences: Experience[];
    webSkillsInVP = new Subject<Event>();
    showWebSkillsTutorial = true;
    resumeURL: string;
    cvURL: string;

    options: AnimationOptions = {
        path: 'assets/animations/swipe-hint-animation.json',
    };

    constructor(public apiService: ApiService, private titleService: Title) {
        titleService.setTitle('Resume');
    }

    ngOnInit(): void {
        this.apiService.getResumeData()
            .pipe(take(1))
            .subscribe(([data, resume, cv, experiences]) => {
                this.data = data;
                this.resumeURL = this.apiService.fileURL(resume.url);
                this.cvURL = this.apiService.fileURL(cv.url);
                this.webSkillsFormatted.push(new WebSkill('Frontend', data.webSkillsFrontend));
                this.webSkillsFormatted.push(new WebSkill('Backend', data.webSkillsBackend));
                this.webSkillsFormatted.push(new WebSkill('General', data.webSkillsGeneral));
                this.experiences = experiences;
            });

        this.tutorialSequence(
            this.webSkillsInVP,
            () => this.showWebSkillsTutorial = true,
            () => this.showWebSkillsTutorial = false
        );
    }

    webSkillsInViewport(event: Event) {
        this.webSkillsInVP.next(event);
    }

    tutorialSequence(observable: Observable<Event>, beforeDelay: () => void, afterDelay: () => void) {
        observable
            .pipe(elementAt(1))
            .pipe(mergeMap((e) => {
                beforeDelay();
                return of(e);
            }))
            .pipe(delay(2000))
            .pipe(take(1))
            .subscribe(afterDelay);
    }

}
