import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PcSetupComponent } from './pc-setup.component';

describe('PcSetupComponent', () => {
  let component: PcSetupComponent;
  let fixture: ComponentFixture<PcSetupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PcSetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PcSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
