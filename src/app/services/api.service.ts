import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppsPageData} from '../models/AppsPageData';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    getAppsPageData(): Observable<AppsPageData> {
        return this.http.get<AppsPageData>('../../assets/appsPageData.json');
    }

}
