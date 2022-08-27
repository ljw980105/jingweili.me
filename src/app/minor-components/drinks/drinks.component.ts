import {Component, OnInit} from '@angular/core';
import {NameAndDescription} from '../../models/pure-models/NameAndDescription';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-drinks',
    templateUrl: './drinks.component.html',
    styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {
    cocktails: NameAndDescription[];

    constructor(private titleService: Title) {
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
                'Cosmopolitan',
                'Citron Vodka, Cranberry Juice, Lime Juice, Triple Sec'
            ),
            new NameAndDescription(
                'Sex on the Beach',
                'Vodka, Peach Schnapps, Cranberry Juice, Orange Juice'
            ),
            new NameAndDescription(
                'Fuzzy Navel',
                'Peach Schnapps, Orange Juice'
            ),
            new NameAndDescription(
                'Aperol Negroni',
                'Gin, Aperol, Sweet Vermouth'
            )
        ];
        titleService.setTitle('Drinks Menu');
    }

    ngOnInit(): void {
    }

}
