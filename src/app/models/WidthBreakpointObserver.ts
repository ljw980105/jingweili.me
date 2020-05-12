import {fromEvent, Subject} from 'rxjs';
import {filter, map, share} from 'rxjs/operators';

export class WidthBreakpointObserver {
    public reachedBreakpoint: boolean;
    public lessThanWidth = new Subject<any>();
    public moreThanWidth = new Subject<any>();

    constructor(private width: number) {
        this.reachedBreakpoint = window.innerWidth >= width;

        const widthObservable = fromEvent(window, 'resize')
            .pipe(map(() => window.innerWidth))
            .pipe(share());

        widthObservable
            .pipe(filter((w) => w < this.width))
            .pipe(filter(() => !this.reachedBreakpoint))
            .subscribe(() => {
                this.reachedBreakpoint = true;
                this.lessThanWidth.next('');
            });

        widthObservable
            .pipe(filter((w) => w >= this.width))
            .pipe(filter(() => this.reachedBreakpoint))
            .subscribe(() => {
                this.reachedBreakpoint = false;
                this.moreThanWidth.next('');
            });
    }
}
