import {Injectable, isDevMode} from '@angular/core';
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
import {catchError, map, mergeMap} from 'rxjs/operators';
import {AboutInfo} from '../models/pure-models/AboutInfo';
import {PCSetupEntry} from '../models/pure-models/PCSetupEntry';
import {Project} from '../models/pure-models/Project';
import {tryCatchWithObservable} from '../models/Global';
import {NameAndURL} from '../models/pure-models/NameAndURL';
import {FileToBrowse} from '../models/pure-models/FileToBrowse';
import {DirectoryInfo} from '../models/files/DirectoryInfo';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public readonly apiRoot: string;

    constructor(private http: HttpClient) {
        this.apiRoot = isDevMode() ? 'http://localhost:8080/' : 'https://jingweili.me/';
    }

    ////////////////
    ///// APPS /////
    ////////////////

    uploadAppsData(data: string): Observable<ServerResponse> {
        return this.addJSONToEndPoint(`${this.apiRoot}api/apps`, data);
    }

    getAppsPageData(): Observable<AppsPageData> {
        return this.http.get<AppsPageData>(`${this.apiRoot}api/apps`)
            .pipe(catchError(() => of(new AppsPageData([], []))));
    }

    getBeatslyticsData(): Observable<BeatslyticsData> {
        return this.http.get<BeatslyticsData>(`${this.apiRoot}api/apps/beatslytics`)
            .pipe(catchError(() => of(new BeatslyticsData('', '', '',
                '', '', [], '', '', '', null, null))));
    }

    uploadBeatslyticsData(data: string): Observable<ServerResponse> {
        return this.addJSONToEndPoint(`${this.apiRoot}api/apps/beatslytics`, data);
    }

    /////////////////
    // EXPERIENCES //
    /////////////////
    addExperiences(data: string): Observable<ServerResponse> {
        return this.addJSONToEndPoint(`${this.apiRoot}api/experiences`, data);
    }


    getExperiencesData(): Observable<Experience[]> {
        return this.http.get<Experience[]>(`${this.apiRoot}api/experiences`)
            .pipe(catchError(() => of([])));
    }

    /////////////////
    // RESUME + CV //
    /////////////////

    // order of data: ResumeData, resume, cv, experiences
    getResumeData(): Observable<[ResumeData, FileLocation, FileLocation, Experience[]]> {
        return forkJoin([
            this.getRemainingResumeData(),
            this.getResume(),
            this.getCV(),
            this.getExperiencesData()
        ]);
    }

    uploadResume(resume: File): Observable<ServerResponse> {
       return this.uploadFileTo(`${this.apiRoot}api/upload-resume`, resume);
    }

    uploadCV(cv: File): Observable<ServerResponse> {
        return this.uploadFileTo(`${this.apiRoot}api/upload-cv`, cv);
    }

    getCV(): Observable<FileLocation> {
        return this.http.get<FileLocation>(`${this.apiRoot}api/cv`);
    }

    // the pdf resume
    getResume(): Observable<FileLocation> {
        return this.http.get<FileLocation>(`${this.apiRoot}api/resume`);
    }

    uploadResumeData(data: string): Observable<ServerResponse> {
        return this.addJSONToEndPoint(`${this.apiRoot}api/resume-data`, data);
    }

    // the data on the resume webpage
    getRemainingResumeData(): Observable<ResumeData> {
        return this.http.get<ResumeData>(`${this.apiRoot}api/resume-data`)
            .pipe(catchError(() => of(
                new ResumeData(0, 0, 0, [], [], [], [], [])
            )));
    }

    /////////////////
    /// GRAPHICS ////
    /////////////////
    getGraphicsProjects(): Observable<GraphicProject[]> {
        return this.http.get<GraphicProject[]>(`${this.apiRoot}api/get-graphic-projects`)
            .pipe(catchError(() => of([])));
    }

    addGraphicProject(project: GraphicProject): Observable<ServerResponse> {
        return this.http.post<ServerResponse>(`${this.apiRoot}api/add-graphic-project`, project, this.authHeaders());
    }

    deleteGraphicsProject(project: GraphicProject): Observable<ServerResponse> {
        return this.http.delete<ServerResponse>(`${this.apiRoot}api/delete-graphic-project/${project.id}`, this.authHeaders());
    }

    getSimplifiedGraphicsProjects(limit: number = 4): Observable<NameAndURL[]> {
        const limitStr = limit !== null ? `?limit=${limit}` : '';
        return this.http.get<NameAndURL[]>(`${this.apiRoot}api/get-graphic-projects/simplified${limitStr}`)
            .pipe(catchError(() => of([])));
    }

    addMultipleGraphicProjects(data: string): Observable<ServerResponse> {
        return this.addJSONToEndPoint(`${this.apiRoot}api/multiple-graphics-projects`, data);
    }


    /////////////////
    ///// FILES /////
    /////////////////
    uploadGenericFile(
        file: File,
        customName: string = null,
        toDirectory: string = 'public'): Observable<ServerResponse> {
        return this.uploadFileTo(`${this.apiRoot}api/upload-file?directory=${toDirectory}`, file, customName);
    }

    uploadMultipleFiles(files: File[], toDirectory: string = 'public'): Observable<ServerResponse[]> {
        return forkJoin(files.map(file => this.uploadGenericFile(file, null, toDirectory)));
    }

    getFilesToBrowseAt(directory: string): Observable<FileToBrowse[]> {
        return this.http
            .get<FileToBrowse[]>(`${this.apiRoot}api/browse-files?directory=${directory}`, this.authHeaders())
            .pipe(catchError((e) => of([new FileToBrowse(`No files available. Error: ${e.message}`)])));
    }

    deleteFile(file: FileToBrowse, directory: string): Observable<ServerResponse> {
        return this.http
            .post<ServerResponse>(`${this.apiRoot}api/delete-files?directory=${directory}`, file, this.authHeaders());
    }

    getDirectoryInfoAt(directory: string): Observable<DirectoryInfo> {
        return this.http.get<DirectoryInfo>(`${this.apiRoot}api/directory-info?directory=${directory}`, this.authHeaders());
    }

    public fileURL(name: string): string {
        return `${this.apiRoot}resources/${name}`;
    }

    public streamFileNamed(name: string, directory: string): Observable<Blob> {
        let props = this.authHeaders();
        props['responseType'] = 'blob';
        return this.http
            .get<Blob>(`${this.apiRoot}api/stream-file?name=${name}&directory=${directory}`, props);
    }

    private uploadFileTo(endpoint: string, fileToUpload: File, customName: string = null): Observable<ServerResponse> {
        const formData: FormData = new FormData();
        formData.append('file', fileToUpload);
        formData.append('name', customName != null ? customName : fileToUpload.name);
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
                    ''));
                }
            ));
    }

    addAboutData(data: AboutInfo): Observable<ServerResponse> {
        return this.http.post<ServerResponse>(`${this.apiRoot}api/about-info`, data, this.authHeaders());
    }

    // pc
    getPCSetups(): Observable<PCSetupEntry[]> {
        return this.http.get<PCSetupEntry[]>(`${this.apiRoot}api/pc-setup`)
            .pipe(catchError(() => of([])));
    }

    addPCSetups(data: string): Observable<ServerResponse> {
        return this.addJSONToEndPoint(`${this.apiRoot}api/pc-setup`, data);
    }

    // Projects
    addProjects(data: string): Observable<ServerResponse> {
        return this.addJSONToEndPoint(`${this.apiRoot}api/projects`, data);
    }

    getProjects(): Observable<Project[]> {
        return this.http.get<Project[]>(`${this.apiRoot}api/projects`)
            .pipe(catchError(() => of([])));
    }

    getSimplifiedProjects(limit: number = 5): Observable<NameAndURL[]> {
        const limitStr = limit !== null ? `?limit=${limit}` : '';
        return this.http.get<NameAndURL[]>(`${this.apiRoot}api/projects/simplified${limitStr}`)
            .pipe(catchError(() => of([])));
    }

    private authHeaders() {
        return {
            headers: new HttpHeaders({
                Authorization: `Bearer ${localStorage.getItem('token')}`
            })
        };
    }

    private addJSONToEndPoint(endpoint: string, data: string): Observable<ServerResponse> {
        return tryCatchWithObservable(
            () => JSON.parse(data),
            (json) => this.http.post<ServerResponse>(endpoint, json, this.authHeaders())
        );
    }
}
