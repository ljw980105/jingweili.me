import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {ResumeData} from '../../models/ResumeData';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit {
    data: ResumeData;

    constructor(private apiService: ApiService) {

    }

    ngOnInit(): void {
        this.apiService.getResumeData()
            .subscribe(data => this.data = data);
    }

}
