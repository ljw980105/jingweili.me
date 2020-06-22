import {Component, Inject, OnInit} from '@angular/core';
import {AnimationOptions} from 'ngx-lottie';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Observable, of} from 'rxjs';
import {catchError, delay, filter, mergeMap, share} from 'rxjs/operators';

@Component({
    selector: 'app-activity-indicator',
    templateUrl: './activity-indicator.component.html',
    styleUrls: ['./activity-indicator.component.scss']
})
export class ActivityIndicatorComponent implements OnInit {
    message = 'Working';
    showWorking = true;
    showError = false;

    constructor(private dialog: MatDialogRef<ActivityIndicatorComponent>,
                @Inject(MAT_DIALOG_DATA) public activity: Observable<any>) {
    }

    options: AnimationOptions = {
        path: 'assets/animations/loading.json'
    };

    errorOptions: AnimationOptions = {
        path: 'assets/animations/error-animation.json',
        loop: false
    };

    ngOnInit(): void {
        const shared = this.activity
            .pipe(catchError(() => of('Failed')))
            .pipe(share());

        shared
            .pipe(filter((s) => s !== 'Failed'))
            .subscribe(() => this.dialog.close());

        shared
            .pipe(filter((s) => s === 'Failed'))
            .pipe(mergeMap((s) => {
                this.showWorking = false;
                this.showError = true;
                this.message = s;
                return of(s);
            }))
            .pipe(delay(3000))
            .subscribe(() => this.dialog.close());

    }

}
