import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-navigator',
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit, OnDestroy {
    editingResume = false;
    editingGraphicDesign = false;
    editingHome = false;

    constructor(private titleService: Title, private apiService: ApiService) {
        this.titleService.setTitle('Admin Panel');
    }

    ngOnInit(): void {
    }

    editResume() {
        this.editingResume = !this.editingResume;
        this.editingGraphicDesign = false;
        this.editingHome = false;
    }

    editGraphicDesign() {
        this.editingResume = false;
        this.editingGraphicDesign = !this.editingGraphicDesign;
        this.editingHome = false;
    }

    editHome() {
        this.editingHome = !this.editingHome;
        this.editingResume = this.editingGraphicDesign = false;
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
