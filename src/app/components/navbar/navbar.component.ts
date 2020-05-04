import {Component, OnInit} from '@angular/core';
import {shrinkOrExpand} from '../../models/Animations';

@Component({
    selector: 'app-navbar',
    animations: [
        shrinkOrExpand
    ],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    expanded = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    toggleExpansion() {
        this.expanded = !this.expanded;
    }

}
