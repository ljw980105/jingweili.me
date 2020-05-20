import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AppsPageData} from '../models/AppsPageData';
import {HttpClient} from '@angular/common/http';
import {BeatslyticsData} from '../models/BeatslyticsData';
import {ResumeData} from '../models/ResumeData';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) {
    }

    getAppsPageData(): Observable<AppsPageData> {
        return this.http.get<AppsPageData>('../../assets/appsPageData.json');
    }

    getBeatslyticsData(): Observable<BeatslyticsData> {
        return this.http.get<BeatslyticsData>('../../assets/beatslytics-data.json');
    }

    getResumeData(): Observable<ResumeData> {
        return this.http.get<ResumeData>('../../assets/resume-data.json');
    }

}
