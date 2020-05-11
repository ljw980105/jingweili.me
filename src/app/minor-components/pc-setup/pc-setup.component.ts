import {Component, OnInit} from '@angular/core';
import {PCSetupEntry} from '../../models/PCSetupEntry';
import {addAnimation} from '../../models/Animations';

@Component({
    selector: 'app-pc-setup',
    animations: [addAnimation],
    templateUrl: './pc-setup.component.html',
    styleUrls: ['./pc-setup.component.scss']
})
export class PcSetupComponent implements OnInit {
    pcSetupEntries: PCSetupEntry[] = [
        new PCSetupEntry('CPU', 'Intel Core i7-9700K @ 4.6GHZ', 'https://amzn.to/2xKitvu'),
        new PCSetupEntry('GPU', 'RTX 2060 Super, MSI Ventus OC Edition', 'https://amzn.to/2YG6bPL'),
        new PCSetupEntry('Motherboard', 'Gigabyte B360 HD3', 'https://amzn.to/2SIfA5o'),
        new PCSetupEntry('SSD', 'WD Blue SN500 500GB', 'https://amz.run/3Bf2'),
        new PCSetupEntry('CPU Cooler', 'Corsair Hydro H60 AIO', 'https://amz.run/3Bf5'),
        new PCSetupEntry('PSU', 'EVGA Supernova 750 G3', 'https://amzn.to/37ryUJR'),
        new PCSetupEntry('RAM', 'Corsair Vengeance LPX White 16GB', 'https://amz.run/3Bf6'),
        new PCSetupEntry('Case', 'ThermalTake V200 RGB Edition', 'https://amz.run/3Bf7'),
        new PCSetupEntry('HDD', 'WD Blue 4TB', 'https://amz.run/3BPS'),
        new PCSetupEntry('HDD', 'Toshiba MQ01ABD100 1TB', 'https://amz.run/3Bf8'),
        new PCSetupEntry('RGB Fans', 'DEEP COOL RF120 x 3', 'https://amz.run/3Bf9')
    ];

    constructor() {
    }

    ngOnInit(): void {
    }

}
