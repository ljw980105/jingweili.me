import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {ActivityIndicatorComponent} from './activity-indicator/activity-indicator.component';
import {DialogSize} from './admin-panel-common';
import {saveAs} from 'file-saver';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AdminHelperService {

    constructor(private matDialog: MatDialog) {
    }

    // Shows an activity indicator popup while the observable sequence is executed.
    showActivityIndicatorWithObservable(
        argument: Observable<any>,
        completion: () => void = () => {},
        size: DialogSize = DialogSize.dialog,
        disableClose = true
    ) {
        const dialogConfig = new MatDialogConfig();
        // The user can't close the dialog by clicking outside its body
        dialogConfig.disableClose = disableClose;
        dialogConfig.id = 'modal-component';
        dialogConfig.height = size.split(', ')[0];
        dialogConfig.width = size.split(', ')[1];
        dialogConfig.data = argument;
        // https://material.angular.io/components/dialog/overview
        const modalDialog = this.matDialog.open(ActivityIndicatorComponent, dialogConfig);
        modalDialog.afterClosed()
            .pipe(take(1))
            .subscribe(completion);
    }

    exportASJSONWithData(data: any, filename: string) {
        const blob = new Blob([JSON.stringify(data)], {type: 'text/plain;charset=utf-8'});
        saveAs(blob, filename);
    }


}
