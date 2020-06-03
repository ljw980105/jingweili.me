import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {forkJoin} from 'rxjs';

@Component({
    selector: 'app-edit-resume',
    templateUrl: './edit-resume.component.html',
    styleUrls: ['./edit-resume.component.scss']
})
export class EditResumeComponent implements OnInit {
    resumeExists = false;
    cvExists = false;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        forkJoin([this.apiService.getResume(), this.apiService.getCV()])
            .subscribe(([resume, cv]) => {
                this.resumeExists = resume.exists;
                this.cvExists = cv.exists;
            });
    }

    uploadResume(event: any) {
        const files = event.target.files as FileList;
        this.apiService.uploadResume(files.item(0))
            .subscribe((x) => console.log(x));
    }

    uploadCV(event: any) {
        const files = event.target.files as FileList;
        this.apiService.uploadCV(files.item(0))
            .subscribe((x) => console.log(x));
    }

}
