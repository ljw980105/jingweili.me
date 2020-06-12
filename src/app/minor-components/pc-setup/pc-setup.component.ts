import {Component, OnInit} from '@angular/core';
import {PCSetupEntry} from '../../models/pure-models/PCSetupEntry';
import {addAnimation} from '../../models/Animations';
import {ApiService} from '../../services/api.service';

@Component({
    selector: 'app-pc-setup',
    animations: [addAnimation],
    templateUrl: './pc-setup.component.html',
    styleUrls: ['./pc-setup.component.scss']
})
export class PcSetupComponent implements OnInit {
    pcSetupEntries: PCSetupEntry[];
    dataReady = false;

    constructor(private apiService: ApiService) {
    }

    ngOnInit(): void {
        this.apiService.getPCSetups()
            .subscribe((entries) => {
                this.pcSetupEntries = entries;
                this.dataReady = true;
            });
    }

}
