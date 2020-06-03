import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGraphicsComponent } from './edit-graphics.component';

describe('EditGraphicsComponent', () => {
  let component: EditGraphicsComponent;
  let fixture: ComponentFixture<EditGraphicsComponent>;

  beforeEach(async(() => {
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
