import {Component, Input, OnInit} from '@angular/core';
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
    @Input() theme = 'dark';
    darkThemed: boolean;
    expanded = false;

    constructor() {
    }

    ngOnInit(): void {
        this.darkThemed = this.theme === 'dark';
    }

    toggleExpansion() {
        this.expanded = !this.expanded;
    }

}
