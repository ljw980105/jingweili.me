import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {FileToBrowse} from '../../models/pure-models/FileToBrowse';
import {AdminHelperService} from '../admin-helper.service';
import {FileBrowserViewModel} from './FileBrowserViewModel';
import {first} from 'rxjs/operators';

@Component({
    selector: 'app-file-browser',
    templateUrl: './file-browser.component.html',
    styleUrls: ['./file-browser.component.scss']
})
export class FileBrowserComponent implements OnInit {
    viewModel: FileBrowserViewModel;
    sortingTable: {[key: string]: [boolean, boolean]} = {};

    constructor(public apiService: ApiService, private helperService: AdminHelperService) {
        this.viewModel = new FileBrowserViewModel(apiService, helperService);
    }

    ngOnInit(): void {
        this.viewModel.sortingTable
            .subscribe((table) => {
                this.sortingTable = table;
            });

        this.refresh();

        this.viewModel.fileFirstRefreshed
            .subscribe(() => this.sortFilesBy('name'));
    }

    deleteFile(file: FileToBrowse) {
        this.viewModel.deleteFile(file, () => this.refresh());
    }

    refresh() {
        this.viewModel.refresh();
    }

    openFileNamed(name: string) {
        this.viewModel.openFileNamed(name);
    }

    sortFilesBy(key: string) {
        this.viewModel.sortBy(key);
    }

    imageNameFor(file: FileToBrowse): string {
        return this.viewModel.imageNameFor(file.type);
    }
}
