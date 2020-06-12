import {Component, Input, OnInit} from '@angular/core';
import {Experience} from '../../models/pure-models/Experience';

@Component({
    selector: 'app-timeline-block',
    templateUrl: './timeline-block.component.html',
    styleUrls: ['./timeline-block.component.scss']
})
export class TimelineBlockComponent implements OnInit {
    @Input() experiences: Experience[] = [];

    constructor() {
    }

    ngOnInit(): void {
    }

}
