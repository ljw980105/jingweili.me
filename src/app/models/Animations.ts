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
    ])
]);

export const rotate45Degrees = trigger('rotate45Degrees', [
    state('default', style({
        transform: 'rotate(0)',
        'transform-origin': 'center'
    })),
    state('rotated', style({
        transform: 'rotate(45deg)',
        'transform-origin': 'center'
    })),
    transition('rotated => default', animate('300ms ease-out')),
    transition('default => rotated', animate('300ms ease-in'))
]);

export const addAnimation = trigger('addAnimation', [
    transition(':enter', [
        style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
        animate(
            '0.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
            style({ transform: 'scale(1)', opacity: 1 })
        )  // final
    ])
]);

export const fadeOut = trigger('fadeOut', [
    state('out', style({opacity: '0'})),
    state('in', style({opacity: '1'})),
    transition('in => out', [
        animate('0.3s ease-in-out')
    ]),
    transition('out => in', [
        animate('0.3s ease-in-out')
    ])
]);

export const removeAnimation = trigger('removeAnimation', [
    transition(':leave', [
        style({ transform: 'scale(1)', opacity: 1, height: '*' }),
        animate('0.5s cubic-bezier(.8, -0.6, 0.2, 1.5)',
            style({
                transform: 'scale(0.5)',
                opacity: 0,
                height: '0px',
                margin: '0px'
            }))
    ])
]);

export const popupAnimation = trigger(
    'enterAnimation', [
        transition(':enter', [
            style({transform: 'translateX(100%)', opacity: 0}),
            animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
            style({transform: 'translateX(0)', opacity: 1}),
            animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
    ]
)

