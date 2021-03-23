import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AdminHelperService} from '../admin-helper.service';
import {multipleFilesFromEvent} from '../../models/Global';
import {MemoryManagerComponent} from '../../shared/memory-manager/memory-manager.component';

@Component({
    selector: 'app-batch-file-uploader',
    templateUrl: './batch-file-uploader.component.html',
    styleUrls: ['./batch-file-uploader.component.scss']
})
export class BatchFileUploaderComponent implements OnInit {
    @Input() title: string;
    @Input() instruction: string;
    @Input() fileTypes: string[] = ['.png', '.jpg', '.jpeg', '.gif'];
    @Input() directory = 'public';
    @Output() uploadCompleted: EventEmitter<any> = new EventEmitter();

    constructor(private apiService: ApiService, private helperService: AdminHelperService) {
    }

    ngOnInit(): void {
    }

    uploadFiles(event: any) {
        const files = multipleFilesFromEvent(event);
        this.helperService.showActivityIndicatorWithObservable(
            this.apiService.uploadMultipleFiles(files, this.directory),
            () => this.uploadCompleted.emit()
        );
    }

}
