import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GraphicDesignComponent } from './graphic-design.component';

describe('GraphicDesignComponent', () => {
  let component: GraphicDesignComponent;
  let fixture: ComponentFixture<GraphicDesignComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicDesignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicDesignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
