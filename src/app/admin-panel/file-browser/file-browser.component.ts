import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Subject, zip} from 'rxjs';
import {FileToBrowse} from '../../models/pure-models/FileToBrowse';
import {AdminHelperService} from '../admin-helper.service';
import {mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-file-browser',
    templateUrl: './file-browser.component.html',
    styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent implements OnInit {
    files: FileToBrowse[] = [];
    spacing = '      ';
    pendingFile = new Subject<File>();
    pendingFileName = new Subject<string>();
    refresher = new Subject<any>();

    directories = ['public', 'private'];
    currentDirectory = this.directories[0];

    constructor(public apiService: ApiService, private helperService: AdminHelperService) {
    }

    ngOnInit(): void {
        zip(this.pendingFile, this.pendingFileName)
            .subscribe(([file, name]) => {
                this.helperService.showActivityIndicatorWithObservable(
                    this.apiService.uploadGenericFile(file, name),
                    () => this.refresh()
                );
            });

        this.refresher
            .pipe(mergeMap(() => this.apiService.getFilesToBrowseAt(this.currentDirectory)))
            .subscribe((files) => this.files = files);

        this.refresh();
    }

    uploadFile(event: any) {
        const files = event.target.files as FileList;
        const firstFile = files.item(0);
        this.pendingFile.next(firstFile);
    }

    addFileName(name: string) {
        this.pendingFileName.next(name);
    }

    deleteFile(file: FileToBrowse) {
        this.helperService.showActivityIndicatorWithObservable(
            this.apiService.deleteFile(file, this.currentDirectory),
            () => this.refresh()
        );
    }

    refresh() {
        this.refresher.next('');
    }

    openFileNamed(name: string) {
        this.apiService.streamFileNamed(name, this.currentDirectory)
            .subscribe((file) => {
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL, '_blank');
            });
    }
}
