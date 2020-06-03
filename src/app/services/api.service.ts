import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {AppsPageData} from '../models/AppsPageData';
import {HttpClient} from '@angular/common/http';
import {BeatslyticsData} from '../models/BeatslyticsData';
import {ResumeData} from '../models/ResumeData';
import {Experience} from '../models/Experience';
import {ServerResponse} from '../models/ServerResponse';
import {FileLocation} from '../models/FileLocation';
import {GraphicProject} from '../models/GraphicProject';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    // public readonly apiRoot = 'http://api.jingweili.me/';
    public readonly apiRoot = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    getAppsPageData(): Observable<AppsPageData> {
        return this.http.get<AppsPageData>('../../assets/appsPageData.json');
    }

    getBeatslyticsData(): Observable<BeatslyticsData> {
        return this.http.get<BeatslyticsData>('../../assets/beatslytics-data.json');
    }

    // order of data: ResumeData, resume, cv, experiences
    getResumeData(): Observable<[ResumeData, FileLocation, FileLocation, Experience[]]> {
        return forkJoin([
            this.http.get<ResumeData>('../../assets/resume-data.json'),
            this.getResume(),
            this.getCV(),
            this.getExperiencesData()
        ]);
    }

    getExperiencesData(): Observable<Experience[]> {
        return this.http.get<Experience[]>('../../assets/experiences-data.json');
    }

    /////////////////
    // RESUME + CV //
    /////////////////

    uploadResume(resume: File): Observable<ServerResponse> {
       return this.uploadFileTo(`${this.apiRoot}api/upload-resume`, resume);
    }

    uploadCV(cv: File): Observable<ServerResponse> {
        return this.uploadFileTo(`${this.apiRoot}api/upload-cv`, cv);
    }

    getCV(): Observable<FileLocation> {
        return this.http.get<FileLocation>(`${this.apiRoot}api/cv`);
    }

    getResume(): Observable<FileLocation> {
        return this.http.get<FileLocation>(`${this.apiRoot}api/resume`);
    }

    /////////////////
    /// GRAPHICS ////
    /////////////////
    getGraphicsProjects(): Observable<GraphicProject[]> {
        return this.http.get<GraphicProject[]>(`${this.apiRoot}api/get-graphic-projects`);
    }

    addGraphicProject(project: GraphicProject): Observable<ServerResponse> {
        return this.http.post<ServerResponse>(`${this.apiRoot}api/add-graphic-project`, project);
    }

    deleteGraphicsProject(project: GraphicProject): Observable<ServerResponse> {
        return this.http.delete<ServerResponse>(`${this.apiRoot}api/delete-graphic-project/${project.id}`);
    }


    /////////////////
    ///// FILES /////
    /////////////////
    uploadGenericFile(file: File): Observable<ServerResponse> {
        return this.uploadFileTo(`${this.apiRoot}api/upload-file`, file);
    }

    public fileURL(name: string): string {
        return `${this.apiRoot}${name}`;
    }

    private uploadFileTo(endpoint: string, fileToUpload: File): Observable<ServerResponse> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('name', fileToUpload.name);
        return this.http.post<ServerResponse>(endpoint, formData);
    }
}
