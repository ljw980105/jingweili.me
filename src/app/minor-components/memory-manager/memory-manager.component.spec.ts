import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MemoryManagerComponent} from './memory-manager.component';

describe('MemoryManagerComponent', () => {
    let component: MemoryManagerComponent;
    let fixture: ComponentFixture<MemoryManagerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MemoryManagerComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MemoryManagerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
