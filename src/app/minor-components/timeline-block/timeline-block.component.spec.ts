import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TimelineBlockComponent } from './timeline-block.component';

describe('TimelineBlockComponent', () => {
  let component: TimelineBlockComponent;
  let fixture: ComponentFixture<TimelineBlockComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TimelineBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimelineBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
