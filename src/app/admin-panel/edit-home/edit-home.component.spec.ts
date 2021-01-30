import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditHomeComponent } from './edit-home.component';

describe('EditHomeComponent', () => {
  let component: EditHomeComponent;
  let fixture: ComponentFixture<EditHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
