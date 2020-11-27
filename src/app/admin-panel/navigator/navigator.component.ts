import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../services/api.service';
import {AnimationOptions} from 'ngx-lottie';

@Component({
    selector: 'app-navigator',
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit, OnDestroy {
    editingResume = false;
    editingGraphicDesign = false;
    editingHome = false;
    editingProjects = false;
    editingApps = false;
    showingFileEditor = false;
    showDefaults = true;

    constructor(private titleService: Title, private apiService: ApiService) {
        this.titleService.setTitle('Admin Panel');
    }

    options: AnimationOptions = {
        path: 'assets/animations/left-loop.json'
    };

    ngOnInit(): void {
    }

    editResume() {
        this.editingResume = !this.editingResume;
        this.editingGraphicDesign = this.editingHome = this.editingProjects = this.editingApps = false;
        this.showDefaults = !this.editingResume;
        this.showingFileEditor = false;
    }

    editGraphicDesign() {
        this.editingGraphicDesign = !this.editingGraphicDesign;
        this.editingHome = this.editingResume = this.editingProjects = this.editingApps = false;
        this.showDefaults = !this.editingGraphicDesign;
        this.showingFileEditor = false;
    }

    editHome() {
        this.editingHome = !this.editingHome;
        this.editingResume = this.editingGraphicDesign = this.editingProjects = this.editingApps = false;
        this.showDefaults = !this.editingHome;
        this.showingFileEditor = false;
    }

    editProjects() {
        this.editingProjects = ! this.editingProjects;
        this.editingResume = this.editingGraphicDesign = this.editingHome = this.editingApps = false;
        this.showDefaults = !this.editingProjects;
        this.showingFileEditor = false;
    }

    editApps() {
        this.editingApps = !this.editingApps;
        this.showDefaults = !this.editingApps;
        this.editingResume = this.editingGraphicDesign = this.editingHome = this.editingProjects = false;
        this.showingFileEditor = false;
    }

    showFileEditor() {
        this.showingFileEditor = !this.showingFileEditor;
        this.showDefaults = !this.showingFileEditor;
        this.editingResume = this.editingGraphicDesign = this.editingHome = this.editingProjects = this.editingApps = false;
    }

    ngOnDestroy() {
        this.logOut();
    }

    logOut() {
        this.apiService.logOut()
            .subscribe(() => {});
    }

}
