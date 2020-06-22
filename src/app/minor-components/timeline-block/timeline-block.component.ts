import {Component, Input, OnInit} from '@angular/core';
import {Experience} from '../../models/pure-models/Experience';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-timeline-block',
    templateUrl: './timeline-block.component.html',
    styleUrls: ['./timeline-block.component.scss']
})
export class TimelineBlockComponent implements OnInit {
    @Input() experiences: Experience[] = [];

    constructor(public apiService: ApiService) {
    }

    ngOnInit(): void {
    }

}
