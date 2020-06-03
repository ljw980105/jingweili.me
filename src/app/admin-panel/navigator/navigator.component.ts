import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-navigator',
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
    editingResume = false;
    editingGraphicDesign = false;

    constructor(private titleService: Title) {
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

}
