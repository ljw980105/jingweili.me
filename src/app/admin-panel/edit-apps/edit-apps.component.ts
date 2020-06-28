import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {AdminHelperService} from '../admin-helper.service';
import {Observable} from 'rxjs';
import {AppsPageData} from '../../models/pure-models/AppsPageData';

@Component({
    selector: 'app-edit-apps',
    templateUrl: './edit-apps.component.html',
    styleUrls: ['./edit-apps.component.scss']
})
export class EditAppsComponent implements OnInit {
    fileTypes: string[] = ['.png', '.jpg', '.jpeg', '.gif', '.svg'];
    appsDataString = '';
    existingAppsData: Observable<AppsPageData>;
    appsJSONSpec = `
        {
            apps: [
                imageLink: string,
                name: string,
                description: string,
                description2?: string,
                linkTitle?: string,
                link?: string,
                id: number = null
            ],
            skills: [
                imageLink: string,
                name: string,
                description: string,
                description2?: string,
                linkTitle?: string,
                link?: string,
                id: number = null
            ]
        }
    `;

    constructor(public apiService: ApiService, private helperService: AdminHelperService) {
    }

    ngOnInit(): void {
        this.existingAppsData = this.apiService.getAppsPageData();
    }

    submitApps() {
        this.helperService.showActivityIndicatorWithObservable(
            this.apiService.uploadAppsData(this.appsDataString)
        );
    }

}
