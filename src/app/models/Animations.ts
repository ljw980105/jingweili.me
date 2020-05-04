import {animate, state, style, transition, trigger} from '@angular/animations';

// simulating jQuery's `slideToggle()`
export const shrinkOrExpand = trigger('shrinkOrExpand', [
    state('shrinked', style({
        opacity: '0',
        overflow: 'hidden',
        height: '0px',
    })),
    state('expanded', style({
        overflow: 'hidden',
        height: '*',
    })),
    transition('shrinked => expanded', [
        animate('0.3s ease-in-out')
    ]),
    transition('expanded => shrinked', [
        animate('0.3s ease-in-out')
    ]),
]);
