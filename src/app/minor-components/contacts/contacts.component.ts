import {Component, OnInit} from '@angular/core';
import {addAnimation} from '../../models/Animations';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    animations: [addAnimation],
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    mail = 'ljw9801055@gmail.com';

    constructor() {
    }

    ngOnInit(): void {
    }

}
