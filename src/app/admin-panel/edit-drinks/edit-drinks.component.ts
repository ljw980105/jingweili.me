import {Component, OnInit} from '@angular/core';
import {MemoryManagerComponent} from '../../shared/memory-manager/memory-manager.component';
import {ApiService} from '../../services/api.service';
import {AdminHelperService} from '../admin-helper.service';
import {takeUntil} from 'rxjs/operators';
import {NameAndDescription} from '../../models/pure-models/NameAndDescription';

@Component({
    selector: 'app-edit-drinks',
    templateUrl: './edit-drinks.component.html',
    styleUrls: ['./edit-drinks.component.scss']
})
export class EditDrinksComponent extends MemoryManagerComponent implements OnInit {

    jsonSpec = `
        {
            "drinks": [
                {
                    "name": "...",
                    "description": "..."
                },
                ...
            ]
        }
    `;
    textAreaContents = '';
    drinks: NameAndDescription[];
    dataReady = false;

    constructor(public apiService: ApiService, private helperService: AdminHelperService) {
        super();
    }



    ngOnInit(): void {
        this.getDrinks();
    }

    getDrinks() {
        this.apiService.getDrinks()
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((drinks) => {
                this.drinks = drinks.drinks;
                this.dataReady = true;
            });
    }

    submitViaJSON() {
        this.helperService.showActivityIndicatorWithObservable(
            this.apiService.addDrinks(this.textAreaContents), () => this.getDrinks()
        );
    }

}
