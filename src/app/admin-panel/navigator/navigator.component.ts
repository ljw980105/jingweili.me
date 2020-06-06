import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-navigator',
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit, OnDestroy {
    editingResume = false;
    editingGraphicDesign = false;

    constructor(private titleService: Title, private apiService: ApiService) {
        this.titleService.setTitle('Admin Panel');
    }

    ngOnInit(): void {
    }

    editResume() {
        this.editingResume = !this.editingResume;
        this.editingGraphicDesign = false;
    }

    editGraphicDesign() {
        this.editingResume = false;
        this.editingGraphicDesign = !this.editingGraphicDesign;
    }

    ngOnDestroy() {
        localStorage.removeItem('token');
        this.apiService.logOut()
            .subscribe(() => {});
    }

}
