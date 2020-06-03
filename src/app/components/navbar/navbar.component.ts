import {Component, Input, OnInit} from '@angular/core';
import {shrinkOrExpand} from '../../models/Animations';

@Component({
    selector: 'app-navbar',
    animations: [ shrinkOrExpand ],
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    @Input() theme = 'dark';
    @Input() showBottomBorderInMobile = false;
    darkThemed: boolean;
    expanded = false;
    bottomBorderStyle: string;

    constructor() {
    }

    ngOnInit(): void {
        this.darkThemed = this.theme === 'dark';
        this.bottomBorderStyle = this.showBottomBorderInMobile ? '0.5px solid black' : 'none';
    }

    toggleExpansion() {
        this.expanded = !this.expanded;
    }

}
