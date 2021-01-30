import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BeatslyticsComponent } from './beatslytics.component';

describe('BeatslyticsComponent', () => {
  let component: BeatslyticsComponent;
  let fixture: ComponentFixture<BeatslyticsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatslyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatslyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
