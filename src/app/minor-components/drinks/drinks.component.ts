import {Component, OnInit} from '@angular/core';
import {NameAndDescription} from '../../models/pure-models/NameAndDescription';

@Component({
    selector: 'app-drinks',
    templateUrl: './drinks.component.html',
    styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {
    cocktails: NameAndDescription[];

    constructor() {
        this.cocktails = [
            new NameAndDescription(
                'Aperol Spritz',
                'Aperol, Prosecco, Sparkling Water'
            ),
            new NameAndDescription(
                'Whiskey Sour',
                'Whiskey, Maple Syrup, Lemon Juice'
            ),
            new NameAndDescription(
                'Manhattan',
                'Whiskey, Sweet Vermouth, Angostura Bitters'
            ),
            new NameAndDescription(
                'Old Fashioned',
                'Whiskey, Simple Syrup, Angostura Bitters'
            ),
            new NameAndDescription(
                'Classic Margarita',
                'Tequila, Lime Juice, Triple Sec'
            ),
            new NameAndDescription(
                'Rum Cosmopolitan',
                'Rum, Cranberry Juice, Lime Juice, Triple Sec'
            ),
            new NameAndDescription(
                'Aperol Negroni',
                'Gin, Aperol, Sweet Vermouth'
            ),
            new NameAndDescription(
                'Boulevardier',
                'Whiskey, Aperol, Sweet Vermouth'
            )
        ];
    }

    ngOnInit(): void {
    }

}
