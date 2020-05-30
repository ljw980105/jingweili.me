import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-navigator',
    templateUrl: './navigator.component.html',
    styleUrls: ['./navigator.component.scss']
})
export class NavigatorComponent implements OnInit {
    editingResume = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    editResume() {
        this.editingResume = !this.editingResume;
    }

}
