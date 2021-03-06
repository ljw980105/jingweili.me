import {FileToBrowse} from '../../models/pure-models/FileToBrowse';
import {BehaviorSubject, fromEvent, Observable, Subject, Subscription, zip} from 'rxjs';
import {DirectoryInfo} from '../../models/files/DirectoryInfo';
import {map, mergeMap, share, take, takeUntil} from 'rxjs/operators';
import {ApiService} from '../../services/api.service';
import {AdminHelperService} from '../admin-helper.service';
import {ElementRef} from '@angular/core';

export class FileBrowserViewModel {
    files: FileToBrowse[] = [];
    originalFiles: FileToBrowse[] = [];
    directoryInfo = new DirectoryInfo();
    refresher = new Subject<any>();
    directories = ['public', 'private'];
    currentDirectory = this.directories[0];
    fileFirstRefreshed: Observable<[FileToBrowse[], DirectoryInfo]>;
    private fileRefreshed: Observable<[FileToBrowse[], DirectoryInfo]>;
    private unsubscribe$: Subject<void> = new Subject();

    // keys: one of [name, created, size, type]
    // values: (activated: bool, order: bool)
    sortingTable: BehaviorSubject<{[key: string]: [boolean, boolean]}> = new BehaviorSubject(
        this.getSortingTable('created', true)
    );

    constructor(private apiService: ApiService, private helperService: AdminHelperService) {
        this.fileRefreshed = this.refresher
            .pipe(mergeMap(() => zip(
                this.apiService.getFilesToBrowseAt(this.currentDirectory),
                this.apiService.getDirectoryInfoAt(this.currentDirectory)
            )))
            .pipe(share());

        this.fileRefreshed
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(([files, info]) => {
                this.files = files;
                this.originalFiles = files;
                this.directoryInfo = info;
            });

        this.fileFirstRefreshed = this.fileRefreshed.pipe(take(1));
    }

    ascendingSortMethods: { [key: string]: (file1: FileToBrowse, file2: FileToBrowse) => number} = {
        name: (file1: FileToBrowse, file2: FileToBrowse) => {
            return file1.name < file2.name ? -1 : 0;
        },
        created: (file1: FileToBrowse, file2: FileToBrowse) => {
            return file1.createdDate < file2.createdDate ? -1 : 0;
        },
        size: (file1: FileToBrowse, file2: FileToBrowse) => {
            return file1.fileSize < file2.fileSize ? -1 : 0;
        },
        type: (file1: FileToBrowse, file2: FileToBrowse) => {
            return file1.type < file2.type ? -1 : 0;
        }
    };

    descendingSortMethods: { [key: string]: (file1: FileToBrowse, file2: FileToBrowse) => number} = {
        name: (file1: FileToBrowse, file2: FileToBrowse) => {
            return file1.name > file2.name ? -1 : 0;
        },
        created: (file1: FileToBrowse, file2: FileToBrowse) => {
            return file1.createdDate > file2.createdDate ? -1 : 0;
        },
        size: (file1: FileToBrowse, file2: FileToBrowse) => {
            return file1.fileSize > file2.fileSize ? -1 : 0;
        },
        type: (file1: FileToBrowse, file2: FileToBrowse) => {
            return file1.type > file2.type ? -1 : 0;
        }
    };

    private getSortingTable(key: string, order: boolean): {[key: string]: [boolean, boolean]} {
        const table: {[key: string]: [boolean, boolean]} = {};
        ['name', 'created', 'size', 'type'].forEach((sortingKey) => {
            table[sortingKey] = [sortingKey === key, sortingKey === key ? order : false];
        });
        return table;
    }

    getSortMethod(ascending: boolean, key: string): (file1: FileToBrowse, file2: FileToBrowse) => number {
        return ascending
            ? this.ascendingSortMethods[key]
            : this.descendingSortMethods[key];
    }

    sortBy(key: string) {
        const status = this.sortingTable.getValue()[key];
        if (status[0]) { // already activated - invert sort order
            const table = this.getSortingTable(key, !status[1]);
            const sortMethod = this.getSortMethod(!status[1], key);
            this.files.sort(sortMethod);
            this.sortingTable.next(table);
        } else { // activate new selection
            const table = this.getSortingTable(key, true);
            const sortMethod = this.getSortMethod(true, key);
            this.files.sort(sortMethod);
            this.sortingTable.next(table);
        }
    }

    refresh() {
        this.refresher.next('');
    }

    deleteFile(file: FileToBrowse, completion: () => void) {
        this.helperService.showActivityIndicatorWithObservable(
            this.apiService.deleteFile(file, this.currentDirectory),
            () => completion()
        );
    }

    openFileNamed(name: string): Subscription {
        return this.apiService.streamFileNamed(name, this.currentDirectory)
            .subscribe((file) => {
                const fileURL = URL.createObjectURL(file);
                window.open(fileURL, '_blank');
            });
    }

    imageNameFor(extension: string): string {
        const imageExtensions = ['png', 'jpg', 'jpeg', 'gif'];
        const root = 'assets/images/admin/';
        if (extension === 'pdf') {
            return root + 'pdfIcon.png';
        } else if (imageExtensions.includes(extension)) {
            return root + 'imageIcon.png';
        }
        return root + 'otherImageIcon.png';
    }

    deallocate() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    filterBySearchBarText(target: ElementRef, $unsubscribe: Subject<void>): Subscription {
        return fromEvent<KeyboardEvent>(target.nativeElement, 'keyup')
            .pipe(map(x => (x.currentTarget as HTMLInputElement).value))
            .pipe(takeUntil($unsubscribe))
            .subscribe((val) => {
                if (val.length === 0) {
                    this.resetToOriginalFiles();
                } else {
                    this.files = this.originalFiles.filter(
                        (file) => file.name.toLowerCase().includes(val.toLowerCase())
                    );
                }
            });
    }

    resetToOriginalFiles() {
        this.files = this.originalFiles;
    }
}
