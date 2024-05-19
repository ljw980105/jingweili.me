import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MemoryManagerComponent} from './memory-manager/memory-manager.component';
import {BytesPipe} from './bytes.pipe';

@NgModule({
    declarations: [
        MemoryManagerComponent,
        BytesPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        MemoryManagerComponent,
        BytesPipe
    ]
})
export class SharedModule {
}
