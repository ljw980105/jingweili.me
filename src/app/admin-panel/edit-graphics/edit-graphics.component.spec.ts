import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditGraphicsComponent } from './edit-graphics.component';

describe('EditGraphicsComponent', () => {
  let component: EditGraphicsComponent;
  let fixture: ComponentFixture<EditGraphicsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGraphicsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGraphicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
