import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualAppComponent } from './dual-app.component';

describe('DualAppComponent', () => {
  let component: DualAppComponent;
  let fixture: ComponentFixture<DualAppComponent>;

  beforeEach(async(() => {
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
