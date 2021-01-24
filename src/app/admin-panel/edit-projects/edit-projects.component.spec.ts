import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditProjectsComponent } from './edit-projects.component';

describe('EditProjectsComponent', () => {
  let component: EditProjectsComponent;
  let fixture: ComponentFixture<EditProjectsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
