import {Component, Input, OnInit} from '@angular/core';
import {shrinkOrExpand} from '../../models/Animations';
import {ApiService} from '../../services/api.service';
import {Observable} from 'rxjs';
import {NameAndURL} from '../../models/pure-models/NameAndURL';

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
    simplifiedProjects: Observable<NameAndURL[]>;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.darkThemed = this.theme === 'dark';
        this.bottomBorderStyle = this.showBottomBorderInMobile ? '0.5px solid black' : 'none';
        this.simplifiedProjects = this.apiService.getSimplifiedProjects();
    }

    toggleExpansion() {
        this.expanded = !this.expanded;
    }

}
