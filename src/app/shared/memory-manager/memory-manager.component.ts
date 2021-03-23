import {Component, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
    selector: 'app-memory-manager',
    template: ``,
})
export class MemoryManagerComponent implements OnDestroy {
    unsubscribe$: Subject<void> = new Subject<void>();

    constructor() {
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

}
