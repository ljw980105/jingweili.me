import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';
import {FileToBrowse} from '../../models/pure-models/FileToBrowse';

@Component({
    selector: 'app-file-browser',
    templateUrl: './file-browser.component.html',
    styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent implements OnInit {
    files: Observable<FileToBrowse[]> = this.apiService.getFilesToBrowse();

    spacing = '      ';

    constructor(public apiService: ApiService) {
    }

    ngOnInit(): void {
    }

}
