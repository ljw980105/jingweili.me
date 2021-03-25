import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemoryManagerComponent} from './memory-manager/memory-manager.component';

@NgModule({
    declarations: [
        MemoryManagerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MemoryManagerComponent
    ]
})
export class SharedModule {
}
