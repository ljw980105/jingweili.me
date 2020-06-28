import {Component, Input, OnInit} from '@angular/core';
import {AppOrSkill} from '../../models/pure-models/AppOrSkill';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-dual-app',
    templateUrl: './dual-app.component.html',
    styleUrls: ['./dual-app.component.scss']
})
export class DualAppComponent implements OnInit {
    @Input() app1: AppOrSkill;
    @Input() app2?: AppOrSkill;

    constructor(public apiService: ApiService) {
    }

    ngOnInit(): void {
    }

}
