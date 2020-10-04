import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {addAnimation} from '../../models/Animations';

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    animations: [addAnimation],
    styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    @Output() closeComponent: EventEmitter<any> = new EventEmitter();
    mail = 'ljw9801055@gmail.com';

    constructor() {
    }

    ngOnInit(): void {
    }

    exit() {
        this.closeComponent.emit();
    }

}
