import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {addAnimation} from '../../models/Animations';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';
import {AboutInfo} from '../../models/pure-models/AboutInfo';

@Component({
    selector: 'app-about',
    animations: [addAnimation],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
    aboutContent: Observable<AboutInfo>;
    mail = 'ljw9801055@gmail.com';
    @Output() closeComponent: EventEmitter<any> = new EventEmitter();

    constructor(public apiService: ApiService) {
    }

    ngOnInit(): void {
        this.aboutContent = this.apiService.getAboutData();
    }

    exit() {
        this.closeComponent.emit();
    }

}
