import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AboutInfo} from '../../models/pure-models/AboutInfo';
import {forkJoin, Observable} from 'rxjs';
import {ServerResponse} from '../../models/pure-models/ServerResponse';
import {PCSetupEntry} from '../../models/pure-models/PCSetupEntry';

@Component({
    selector: 'app-edit-home',
    templateUrl: './edit-home.component.html',
    styleUrls: ['./edit-home.component.scss']
})
export class EditHomeComponent implements OnInit {
    aboutContent = '';
    imgUrl = '';
    dataReady = false;
    profileImgName = '';
    pcSetups: PCSetupEntry[] = [];
    pcSetupContent = '';

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        forkJoin([this.apiService.getAboutData(), this.apiService.getPCSetups()])
            .subscribe(([about, pcSetups]) => {
                console.log(about);
                this.aboutContent = about.content;
                this.imgUrl = this.apiService.fileURL(about.imageUrl);
                this.pcSetups = pcSetups;
                this.dataReady = true;
            });
    }

    uploadProfileImage(event: any) {
        this.uploadFile(event, file => this.profileImgName = file.name)
            .subscribe((resp) => {
                this.imgUrl = this.apiService.fileURL(this.profileImgName);
                console.log(resp);
            });
    }

    uploadFile(event: any, fileCallback: (file: File) => void): Observable<ServerResponse> {
        const files = event.target.files as FileList;
        fileCallback(files.item(0));
        return this.apiService.uploadGenericFile(files.item(0));
    }

    uploadAboutInfo() {
        this.apiService.addAboutData(new AboutInfo(this.aboutContent, this.profileImgName))
            .subscribe((info) => {
                console.log(info);
                this.imgUrl = this.apiService.fileURL(this.profileImgName);
            });
    }

    updatePCSetups() {
        this.apiService.addPCSetups(this.pcSetupContent)
            .subscribe(res => console.log(res));
    }

}
