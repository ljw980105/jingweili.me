import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DualAppComponent } from './dual-app.component';

describe('DualAppComponent', () => {
  let component: DualAppComponent;
  let fixture: ComponentFixture<DualAppComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DualAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
