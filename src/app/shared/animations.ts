import { animate, state, style, transition, trigger } from "@angular/animations";

export const NavbarScrollAnimation = [
    trigger('navbarScroll', [
        state('scroll', style({
            'box-shadow': '0 3px 12px 0 rgba(0,0,0,.50)',
            'background': '#354df9',
            'padding': '0.5rem'
        })),
        state('noScroll', style({
            'padding': '1.25rem'
        })),
        transition('noScroll <=> scroll', animate('250ms ease-in'))
    ])
];