import {Component, OnInit} from '@angular/core';
import {PCSetupEntry} from '../../models/PCSetupEntry';

@Component({
    selector: 'app-pc-setup',
    templateUrl: './pc-setup.component.html',
    styleUrls: ['./pc-setup.component.scss']
})
export class PcSetupComponent implements OnInit {
    pcSetupEntries: PCSetupEntry[] = [
        new PCSetupEntry('CPU', 'Intel Core i7-9700K @ 4.6GHZ', 'https://amzn.to/2xKitvu'),
        new PCSetupEntry('GPU', 'RTX 2060 Super, MSI Ventus OC Edition', 'https://amzn.to/2YG6bPL'),
        new PCSetupEntry('Motherboard', 'Gigabyte B360 HD3', 'https://amzn.to/2SIfA5o')
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
