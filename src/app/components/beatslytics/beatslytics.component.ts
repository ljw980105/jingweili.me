import {Component, OnInit} from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';
import {ApiService} from '../../services/api.service';
import {BeatslyticsData} from '../../models/pure-models/BeatslyticsData';
import {take} from 'rxjs/operators';

@Component({
    selector: 'app-beatslytics',
    templateUrl: './beatslytics.component.html',
    styleUrls: ['./beatslytics.component.scss']
})

export class BeatslyticsComponent implements OnInit {
    data: BeatslyticsData;

    constructor(
        private metaService: Meta,
        private titleSerivce: Title,
        private apiService: ApiService) {
        titleSerivce.setTitle('Beatslytics');
    }

    ngOnInit(): void {
        this.apiService.getBeatslyticsData()
            .pipe(take(1))
            .subscribe(data => {
                this.data = data;
                this.metaService.addTag({
                    name: data.metaAppStoreName,
                    content: data.metaAppStoreContent
                }, false);
            });
    }

}
