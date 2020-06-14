import {Injectable} from '@angular/core';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {AppsPageData} from '../models/pure-models/AppsPageData';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BeatslyticsData} from '../models/pure-models/BeatslyticsData';
import {ResumeData} from '../models/pure-models/ResumeData';
import {Experience} from '../models/pure-models/Experience';
import {ServerResponse} from '../models/pure-models/ServerResponse';
import {FileLocation} from '../models/pure-models/FileLocation';
import {GraphicProject} from '../models/pure-models/GraphicProject';
import {Password} from '../models/authentication/Password';
import {Token} from '../models/authentication/Token';
import {catchError, mergeMap} from 'rxjs/operators';
import {AboutInfo} from '../models/pure-models/AboutInfo';
import {PCSetupEntry} from '../models/pure-models/PCSetupEntry';
import {Project} from '../models/pure-models/Project';

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

    getProjectsData(): Observable<Project[]> {
        return this.http.get<Project[]>('../../assets/projects-data.json');
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
        return this.http.post<ServerResponse>(`${this.apiRoot}api/add-graphic-project`, project, this.authHeaders());
    }

    deleteGraphicsProject(project: GraphicProject): Observable<ServerResponse> {
        return this.http.delete<ServerResponse>(`${this.apiRoot}api/delete-graphic-project/${project.id}`, this.authHeaders());
    }


    /////////////////
    ///// FILES /////
    /////////////////
    uploadGenericFile(file: File): Observable<ServerResponse> {
        return this.uploadFileTo(`${this.apiRoot}api/upload-file`, file);
    }

    uploadMultipleFiles(files: File[]): Observable<ServerResponse[]> {
        return forkJoin(files.map(file => this.uploadGenericFile(file)));
    }

    public fileURL(name: string): string {
        return `${this.apiRoot}${name}`;
    }

    private uploadFileTo(endpoint: string, fileToUpload: File): Observable<ServerResponse> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('name', fileToUpload.name);
        return this.http.post<ServerResponse>(endpoint, formData, this.authHeaders());
    }

    //// login ////
    loginWithPassword(password: string): Observable<any> {
        return this.http.post<Token>(`${this.apiRoot}api/login`, new Password(password))
            .pipe(mergeMap((token) => {
                localStorage.setItem('token', token.token);
                return of('');
            }));
    }

    logOut(): Observable<ServerResponse> {
        return this.http.get<ServerResponse>(`${this.apiRoot}api/logout`);
    }

    // About
    getAboutData(): Observable<AboutInfo> {
        return this.http.get<AboutInfo[]>(`${this.apiRoot}api/about-info`)
            .pipe(mergeMap(infos =>
                infos.length !== 0
                    ? of(infos[0])
                    : throwError('No About Info Found')))
            .pipe(catchError(() => {
                return of(new AboutInfo(
                    'No About Info Exists',
                    'xxxxx'));
                }
            ));
    }

    addAboutData(data: AboutInfo): Observable<ServerResponse> {
        return this.http.post<ServerResponse>(`${this.apiRoot}api/about-info`, data, this.authHeaders());
    }

    // pc
    getPCSetups(): Observable<PCSetupEntry[]> {
        return this.http.get<PCSetupEntry[]>(`${this.apiRoot}api/pc-setup`);
    }

    addPCSetups(data: string): Observable<ServerResponse> {
        return this.http.post<ServerResponse>(`${this.apiRoot}api/pc-setup`, JSON.parse(data), this.authHeaders());
    }

    private authHeaders() {
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${localStorage.getItem('token')}`
            })
        };
    }
}
