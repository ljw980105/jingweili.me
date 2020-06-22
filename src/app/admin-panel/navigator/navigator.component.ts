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
        this.editingGraphicDesign = false;
        this.editingHome = this.editingProjects = false;
        this.showDefaults = !this.editingResume;
    }

    editGraphicDesign() {
        this.editingGraphicDesign = !this.editingGraphicDesign;
        this.editingHome = this.editingResume = this.editingProjects = false;
        this.showDefaults = !this.editingGraphicDesign;
    }

    editHome() {
        this.editingHome = !this.editingHome;
        this.editingResume = this.editingGraphicDesign = this.editingProjects = false;
        this.showDefaults = !this.editingHome;
    }

    editProjects() {
        this.editingProjects = ! this.editingProjects;
        this.editingResume = this.editingGraphicDesign = this.editingHome = false;
        this.showDefaults = !this.editingProjects;
    }

    ngOnDestroy() {
        this.logOut();
    }

    logOut() {
        localStorage.removeItem('token');
        this.apiService.logOut()
            .subscribe(() => {});
    }

}
