import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {GraphicProject} from '../../models/pure-models/GraphicProject';
import {Observable, Subject} from 'rxjs';
import {AdminHelperService} from '../admin-helper.service';
import {rotate45Degrees, shrinkOrExpand} from '../../models/Animations';
import {mergeMap} from 'rxjs/operators';

@Component({
    selector: 'app-edit-graphics',
    templateUrl: './edit-graphics.component.html',
    animations: [rotate45Degrees, shrinkOrExpand],
    styleUrls: ['./edit-graphics.component.scss']
})
export class EditGraphicsComponent implements OnInit {
    rectangleImageName: string;
    squareImageName: string;
    name: string;
    description: string;
    url: string;
    graphicProjects: GraphicProject[] = [];
    refresher = new Subject<any>();
    jsonSpec = `
        [
          {
            "imageURLRectangle": string,
            "imageURLSquare": string,
            "name": string,
            "description": string,
            "projectURL": string
          }, ...
        ]
    `;
    manualAddExpanded = false;
    textAreaContents = '';

    constructor(public apiService: ApiService, private helperService: AdminHelperService) {
    }

    ngOnInit(): void {
        this.refresher
            .pipe(mergeMap(() => this.apiService.getGraphicsProjects()))
            .subscribe((projects) => {
                this.graphicProjects = projects;
            });
        this.refresher.next('');
    }

    uploadSquareImage(event: any) {
        this.uploadFile(event, file => this.squareImageName = file.name);
    }

    uploadRecImage(event: any) {
        this.uploadFile(event, file => this.rectangleImageName = file.name);
    }

    uploadFile(event: any, fileCallback: (file: File) => void) {
        const files = event.target.files as FileList;
        fileCallback(files.item(0));
        this.helperService.showActivityIndicatorWithObservable(this.apiService.uploadGenericFile(files.item(0)));
    }

    submitProject() {
        this.apiService.addGraphicProject(
            new GraphicProject(
                this.name,
                this.description,
                this.rectangleImageName,
                this.squareImageName,
                this.url
            )
        ).subscribe(() => {
            this.name = this.description = this.squareImageName = this.rectangleImageName = this.url = '';
            this.refreshProjects();
        });
    }

    deleteProject(project: GraphicProject) {
        this.helperService.showActivityIndicatorWithObservable(
            this.apiService.deleteGraphicsProject(project),
            () => this.refreshProjects());
    }

    nameLength(): number {
        return this.name?.length ?? 0;
    }

    exportJSON() {
        this.helperService.exportASJSONWithData(this.graphicProjects, 'graphics-projects.json');
    }

    toggleManualAdd() {
        this.manualAddExpanded = !this.manualAddExpanded;
    }

    submitViaJSON() {
        this.helperService.showActivityIndicatorWithObservable(
            this.apiService.addMultipleGraphicProjects(this.textAreaContents),
            () => this.refreshProjects()
        );
    }

    refreshProjects() {
        this.refresher.next('');
    }

}
